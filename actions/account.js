"use server";

import { db } from "@/lib/prisma";
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

const serializeDecimal = (obj) => {
  const serialized = { ...obj };
  if (obj.balance) {
    serialized.balance = obj.balance.toNumber();
  }
  if (obj.amount) {
    serialized.amount = obj.amount.toNumber();
  }
  return serialized;
};

export async function getAccountWithTransactions(accountId) {
  const { userId } = await auth();
  if (!userId) throw new Error("Unauthorized");

  const user = await db.user.findUnique({
    where: { clerkUserId: userId },
  });

  if (!user) throw new Error("User not found");

  const account = await db.account.findUnique({
    where: {
      id: accountId,
      userId: user.id,
    },
    include: {
      transactions: {
        orderBy: { date: "desc" },
      },
      _count: {
        select: { transactions: true },
      },
    },
  });

  if (!account) return null;

  return {
    ...serializeDecimal(account),
    transactions: account.transactions.map(serializeDecimal),
  };
}

export async function bulkDeleteTransactions(transactionIds) {
  console.log("Starting bulk delete for IDs:", transactionIds);
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) throw new Error("User not found");

    // Get transactions to calculate balance changes
    const transactions = await db.transaction.findMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

    console.log("Transactions to delete:", transactions);

    // Group transactions by account to update balances
    const accountBalanceChanges = transactions.reduce((acc, transaction) => {
      const change =
        transaction.type === "EXPENSE"
          ? transaction.amount
          : -transaction.amount;
      acc[transaction.accountId] = (acc[transaction.accountId] || 0) + change;
      return acc;
    }, {});

    console.log("Account balance changes:", accountBalanceChanges);

    // Delete transactions and update account balances in a transaction
    const deleteResult = await db.$transaction(async (tx) => {
    // Delete transactions
    const deleteResult = await tx.transaction.deleteMany({
      where: {
        id: { in: transactionIds },
        userId: user.id,
      },
    });

      console.log("Delete result:", deleteResult); // <-- Log the result of delete operation

  // Ensure delete operation was successful
  if (deleteResult.count === 0) {
    throw new Error("No transactions were deleted.");
  }

   // Check if accountBalanceChanges is valid
   console.log("Account Balance Changes:", accountBalanceChanges); 
   if (!accountBalanceChanges || Object.keys(accountBalanceChanges).length === 0) {
     console.error("No account balance changes detected. Skipping balance updates.");
     return;
   }

   console.log("Updating account balances...");
      // Update account balances
      for (const [accountId, balanceChange] of Object.entries(
        accountBalanceChanges
      )) {

        if (!accountId) {
          console.error("Invalid accountId:", accountId);
          continue; // Skip invalid accountIds
        }
        if (balanceChange === undefined || balanceChange === null) {
          console.error("Invalid balanceChange for account:", accountId);
          continue; // Skip invalid balanceChange
        }
        console.log(`Updating account ${accountId} with balance change ${balanceChange}`);

        await tx.account.update({
          where: { id: accountId },
          data: {
            balance: {
              increment: balanceChange,
            },
          },
        });
      }
    });

    console.log("updation complete");
    if (!accountId) {
      console.error("accountId is not defined. Skipping revalidation.");
      return { success: false, error: "accountId is missing." };
    }
    else{
      console.log("revalidation");
    }

    revalidatePath("/dashboard");
    revalidatePath(`/account/${accountId}`);

    return { success: true };
  } catch (error) {
    console.error("Error in bulkDeleteTransactions:", error); 
    return { success: false, error: error.message };
  }
}

export async function updateDefaultAccount(accountId) {
  try {
    const { userId } = await auth();
    if (!userId) throw new Error("Unauthorized");

    const user = await db.user.findUnique({
      where: { clerkUserId: userId },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // First, unset any existing default account
    await db.account.updateMany({
      where: {
        userId: user.id,
        isDefault: true,
      },
      data: { isDefault: false },
    });

    // Then set the new default account
    const account = await db.account.update({
      where: {
        id: accountId,
        userId: user.id,
      },
      data: { isDefault: true },
    });

    revalidatePath("/dashboard");
    return { success: true, data: serializeTransaction(account) };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
