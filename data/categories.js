export const defaultCategories = [
  // Income Categories
  {
    id: "salary",
    name: "Salary",
    type: "INCOME",
    color: "#22c55e", // green-500
  },
  {
    id: "freelance",
    name: "Freelance",
    type: "INCOME",
    color: "#06b6d4", // cyan-500
  },
  {
    id: "investments",
    name: "Investments",
    type: "INCOME",
    color: "#6366f1", // indigo-500
  },
  {
    id: "business",
    name: "Business",
    type: "INCOME",
    color: "#ec4899", // pink-500
  },
  {
    id: "rental",
    name: "Rental",
    type: "INCOME",
    color: "#f59e0b", // amber-500
  },
  {
    id: "other-income",
    name: "Other Income",
    type: "INCOME",
    color: "#64748b", // slate-500
  },

  // Expense Categories
  {
    id: "housing",
    name: "Housing",
    type: "EXPENSE",
    color: "#ef4444", // red-500
    subcategories: ["Rent", "Mortgage", "Property Tax", "Maintenance"],
  },
  {
    id: "transportation",
    name: "Transportation",
    type: "EXPENSE",
    color: "#f97316", // orange-500
    subcategories: ["Fuel", "Public Transport", "Maintenance", "Parking"],
  },
  {
    id: "groceries",
    name: "Groceries",
    type: "EXPENSE",
    color: "#84cc16", // lime-500
  },
  {
    id: "utilities",
    name: "Utilities",
    type: "EXPENSE",
    color: "#06b6d4", // cyan-500
    subcategories: ["Electricity", "Water", "Gas", "Internet", "Phone"],
  },
  {
    id: "entertainment",
    name: "Entertainment",
    type: "EXPENSE",
    color: "#8b5cf6", // violet-500
    subcategories: ["Movies", "Games", "Streaming Services"],
  },
  {
    id: "food",
    name: "Food",
    type: "EXPENSE",
    color: "#f43f5e", // rose-500
  },
  {
    id: "shopping",
    name: "Shopping",
    type: "EXPENSE",
    color: "#ec4899", // pink-500
    subcategories: ["Clothing", "Electronics", "Home Goods"],
  },
  {
    id: "healthcare",
    name: "Healthcare",
    type: "EXPENSE",
    color: "#14b8a6", // teal-500
    subcategories: ["Medical", "Dental", "Pharmacy", "Insurance"],
  },
  {
    id: "education",
    name: "Education",
    type: "EXPENSE",
    color: "#6366f1", // indigo-500
    subcategories: ["Tuition", "Books", "Courses"],
  },
  {
    id: "personal",
    name: "Personal Care",
    type: "EXPENSE",
    color: "#d946ef", // fuchsia-500
    subcategories: ["Haircut", "Gym", "Beauty"],
  },
  {
    id: "travel",
    name: "Travel",
    type: "EXPENSE",
    color: "#0ea5e9", // sky-500
  },
  {
    id: "insurance",
    name: "Insurance",
    type: "EXPENSE",
    color: "#64748b", // slate-500
    subcategories: ["Life", "Home", "Vehicle"],
  },
  {
    id: "gifts",
    name: "Gifts & Donations",
    type: "EXPENSE",
    color: "#f472b6", // pink-400
  },
  {
    id: "bills",
    name: "Bills & Fees",
    type: "EXPENSE",
    color: "#fb7185", // rose-400
    subcategories: ["Bank Fees", "Late Fees", "Service Charges"],
  },
  {
    id: "other-expense",
    name: "Other Expenses",
    type: "EXPENSE",
    color: "#94a3b8", // slate-400
  },
];

export const categoryColors = defaultCategories.reduce((acc, category) => {
  acc[category.id] = category.color;
  return acc;
}, {});
