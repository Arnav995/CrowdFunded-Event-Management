# CF Events

A full-stack crowdfunding platform for community events. Built with a strong focus on backend business logic, raw SQL performance, and database-level transaction safety.

## Tech Stack
* **Backend:** Node.js, Express.js, JWT
* **Database:** MySQL 8.0 (Raw SQL, No ORM)
* **Frontend:** React.js

## Database & Backend Architecture
The core engine relies entirely on hand-written SQL, offloading critical financial logic directly to the database layer for maximum safety and performance.

* **Stored Procedures:** Used for multi-step financial operations (`add_money`, `process_refunds`) to guarantee ACID compliance.
* **Database Triggers:** Automatically sync `events.current_amount` upon new contributions and log wallet transaction history.
* **Wallet System:** Users fund an internal wallet first. This prevents external payment API overdrafts and makes bulk refunds instantly calculable.
* **State Machine:** Events strictly follow a database-enforced lifecycle (`pending` → `approved` → `funded` or `failed`).
* **Automated Expiry & Refunds:** Endpoints explicitly designed to check deadline-passed events, mark them as failed, and automatically refund all backers' wallets.

## Features

**Users**
* JWT-based authentication.
* Top up internal wallet balance.
* Submit new event campaigns for admin approval.
* Back live events using wallet funds.
* Track personal contributions and event funding progress.

**Admins**
* View global platform statistics (total raised, funded events, etc.).
* Approve or reject pending event submissions.
* Trigger expiry and automated refund processes for dead campaigns.

## Local Setup

### 1. Database
Import the schema into MySQL:
```bash
mysql -u root -p < schema.sql
```

### 2. Backend
Create a `.env` file in `/backend`:
```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=cf_events
JWT_SECRET=your_secret_key
```
Install and run:
```bash
cd backend
npm install
npm run dev
```

### 3. Frontend
```bash
cd frontend
npm install
npm run dev
```
