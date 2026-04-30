# CF Events

A full-stack crowdfunding platform for community events where users can create campaigns, fund them through a wallet system, and track event progress.

## Tech Stack

- **Backend:** Node.js, Express.js, JWT, bcrypt
- **Database:** MySQL 8.0 (raw SQL, stored procedures, triggers)
- **Frontend:** React, React Router, custom CSS

## Core Features

- JWT-based authentication and protected routes
- Admin approval flow for newly created events
- Wallet system for adding funds and making contributions
- Event progress tracking with raised amount and percentage
- User dashboard for created events and contribution history
- Admin dashboard for approvals, rejections, and platform stats
- Expired event handling and refund processing

## Backend

The backend is organized around route-controller separation, with raw SQL queries and database-driven business logic.

### Main modules
- **Auth** — signup, login, password hashing, token verification
- **Events** — create event, fetch approved events, fetch user events, event progress, expired-event checks
- **Contributions** — contribute to an event using wallet balance
- **Transactions** — user contribution and wallet-related history
- **Wallet** — fetch wallet balance and add money
- **Admin** — approve/reject events, review pending events, and view overall platform stats

## Database

The database handles the critical logic of the application, not just storage.

### Main design
- **Users** store account details, role, and wallet balance.
- **Events** store title, description, target amount, current amount, deadline, status, and creator.
- **Contributions** record each user-to-event contribution.
- **Transactions** maintain a history of wallet-related activity.

### Financial logic
- Contributions are made through an internal **wallet system**, so money flow is controlled before it reaches an event.
- **Stored procedures** are used for wallet crediting and refund processing.
- This keeps financial operations centralized and consistent at the database level.

### Automation
- **Triggers** automate related updates after contributions and wallet operations.
- Event totals such as `current_amount` stay synced with contribution activity.
- Transaction records help maintain wallet and contribution traceability.

### Event lifecycle
`pending -> approved -> funded / failed / rejected`

- **pending** — created by user, waiting for admin review
- **approved** — visible and open for funding
- **funded** — target reached
- **failed** — deadline passed without full funding
- **rejected** — denied by admin

### Expiry and refunds
- Expired approved events can be marked as **failed** based on deadline.
- Refund processing returns contributed money back to users’ wallets.
- This makes failed-campaign handling predictable and database-driven.

## Run Locally

### Backend
```bash
cd backend
npm install
npm run dev
```

Create a `.env` file inside `backend/`:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=cf_events
JWT_SECRET=your_secret_key
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```
