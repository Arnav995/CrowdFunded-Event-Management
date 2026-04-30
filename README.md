# CF Events

A full-stack crowdfunding platform for community events where users can create campaigns, fund them through a wallet system, and track event progress.

## Tech Stack

- **Backend:** Node.js, Express.js, JWT, bcrypt
- **Database:** MySQL 8.0 (raw SQL, stored procedures, triggers)
- **Frontend:** React, CSS

## Core Features

- JWT-based authentication and protected routes
- Admin approval flow for newly created events
- Wallet system for adding funds and making contributions
- Event progress tracking with raised amount and percentage
- Dashboard for user events and contribution history
- Admin dashboard for approvals, rejections, and platform stats
- Expired event handling and refund processing

## Backend

The backend is organized around route-controller separation with raw SQL queries and database-driven business logic.

### Main modules
- **Auth** — signup, login, token verification
- **Events** — create event, fetch approved events, fetch personal events, event progress
- **Contributions** — contribute to an event using wallet balance
- **Transactions** — user contribution history
- **Wallet** — fetch wallet balance and add money
- **Admin** — approve/reject events, check pending events, view overall stats

## Database

The database handles the critical logic of the application, not just storage.

- **Stored procedures** are used for wallet crediting and refund processing
- **Triggers** automate related updates after transactions/contributions
- **Event lifecycle** follows `pending -> approved -> funded / failed / rejected`
- **Wallet balance management** is tied directly to contribution flow
- **Refund logic** handles expired or failed events safely

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
