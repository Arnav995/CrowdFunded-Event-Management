***

# CF Events
[![React](https://img.shields.io/badge/Frontend-React-blue?logo=react&logoColor=white)](#) [![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=nodedotjs&logoColor=white)](#) [![MySQL](https://img.shields.io/badge/Database-MySQL_8.0-lightgrey?logo=mysql&logoColor=blue)](#)

A full-stack crowdfunding platform designed for community events. CF Events allows users to create campaigns, fund them via an integrated virtual wallet, and track progress, all backed by robust database-level financial logic.

---

## 🏗️ System Architecture

Unlike standard CRUD applications, CF Events offloads critical financial integrity and automation to the database layer, ensuring atomic transactions and data consistency.

### Tech Stack
- **Frontend:** React, CSS
- **Backend:** Node.js, Express.js, JWT, bcrypt
- **Database:** MySQL 8.0 (Raw SQL, Stored Procedures, Triggers)

### Core Modules
| Module | Description |
| :--- | :--- |
| **Auth** | Registration, login, bcrypt password hashing, and JWT verification. |
| **Events** | Campaign creation, status fetching, progress calculation, and expiry checks. |
| **Wallet** | Internal balance management and fund additions. |
| **Contributions** | Logic for moving funds from user wallets to event pools. |
| **Transactions** | Immutable ledger recording all wallet and contribution activity. |
| **Admin** | Dashboard for approving/rejecting events and viewing platform analytics. |

---

## ⚙️ Features & Logic

### Event Lifecycle State Machine
Events follow a strict, predictable progression managed by admin review and time-based criteria:

`[ Pending ]  →  [ Approved ]  →  [ Funded ] OR [ Failed ]`
*(Events can also be marked as `[ Rejected ]` directly from the Pending state).*

### Database-Driven Financial Engine
- **Centralized Money Flow:** Contributions require an internal wallet balance. Funds are deducted securely before being credited to an event.
- **Stored Procedures:** Used for complex operations like wallet crediting and mass refund processing for failed campaigns.
- **Automated Triggers:** Event totals (`current_amount`) stay perfectly synchronized with the `Contributions` table automatically, preventing data drift.
- **Predictable Refunds:** When an event deadline passes without meeting the goal, it is marked as failed, and funds are programmatically returned to users' wallets.

---

## 💻 Local Development Setup

Follow these steps to get the project running on your local machine.

### Prerequisites
- Node.js installed
- MySQL 8.0 server running

### 1. Database Configuration
*Initialize your MySQL database using the provided schema files (ensure stored procedures and triggers are imported).*

### 2. Backend Setup
Navigate to the backend directory and install dependencies:
```bash
cd backend
npm install
## Run Locally


Create a `.env` file inside `backend/`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=cf_events
JWT_SECRET=your_secret_key
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
