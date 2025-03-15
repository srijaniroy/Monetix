# Monetix  
An **AI-powered personal finance platform** to help users **track expenses, manage budgets, and gain financial insights effortlessly**.  

**Live Demo**: [Monetix Live](https://monetix-tan.vercel.app/)  

## Features  

- **Savings & Transactions Management** – Create and manage savings accounts with **detailed transaction tracking**.  
- **AI-Powered Financial Insights** – Uses **Gemini AI** to generate **monthly financial reports** and spending insights.  
- **Automated Budget Alerts** – Sends **email alerts** when the user exceeds their budget.  
- **Secure User Authentication** – **Clerk authentication** with middleware support.  
- **Real-Time Expense Tracking** – View **transactions with filtering and sorting**.  
- **Recurring Transactions** – Automatically logs **subscriptions and fixed expenses**.  
- **Receipt Scanner** – AI-powered **receipt scanning** for **automatic transaction logging**.  
- **Data Visualization** – Uses **Recharts** for **pie charts, bar charts, and spending summaries**.  
- **Server Actions & API Optimizations** – Implements **Prisma ORM** for efficient **data handling**.  
- **Bot Protection & Rate Limiting** – Integrates **Arcjet Shield** for enhanced security.  
- **Scheduled Jobs** – Uses **Inngest** to automate **monthly reports and recurring transactions**.  

---

## Installation & Setup  

### 1. Clone the Repository  
```sh
git clone https://github.com/srijaniroy/Monetix
cd Monetix
```

### 2. Install Dependencies  
```sh
npm i --legacy-peer-deps
```

### 3. Set Up Environment Variables  

Create a `.env` file and add the following keys:  

```sh
DATABASE_URL=your-database-url
DIRECT_URL=your-direct-db-url

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your-clerk-public-key
CLERK_SECRET_KEY=your-clerk-secret-key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/onboarding
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

GEMINI_API_KEY=your-gemini-ai-key
RESEND_API_KEY=your-resend-api-key
ARCJET_KEY=your-arcjet-security-key
```

### 4. Run the Project  
```sh
# Start the development server
npm run dev
```
The app will be available at **`http://localhost:3000`**.  

---

## How It Works  

1. **User Onboarding & Authentication** – Users sign up via **Clerk authentication**.  
2. **Expense Tracking** – Transactions are **recorded, categorized, and visualized** with filtering and sorting.  
3. **AI-Powered Insights** – **Gemini AI** generates financial reports & spending insights.  
4. **Automated Budget Alerts** – **Inngest cron jobs** send **email notifications** for budget tracking.  
5. **Receipt Scanner** – Users upload receipts, and **AI auto-fills transaction details**.  
6. **Security & Rate Limiting** – **Arcjet Shield** prevents bot activity and enforces secure API calls.  

---

## Technologies Used  

### Frontend  
- **Next.js** – Optimized frontend performance with SSR  
- **Shadcn UI & Tailwind CSS** – Modern UI design  
- **Clerk** – Secure authentication & onboarding  
- **Recharts** – Data visualization for financial insights  

### Backend  
- **Prisma ORM** – Efficient database management  
- **Gemini AI** – AI-powered insights & receipt scanning  
- **Inngest** – Background tasks & scheduled jobs  
- **Arcjet** – Security & rate limiting  

---

## Future Enhancements  

- **Bank Integrations** – Sync **real-time bank transactions**.  
- **AI-Powered Smart Budgeting** – Predictive budget adjustments based on spending patterns.  
- **Multi-Currency Support** – Manage expenses in **multiple currencies**.  
- **Mobile App Support** – Develop a mobile-friendly **React Native version**.  

---
