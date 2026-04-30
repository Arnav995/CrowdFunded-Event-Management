# CF Events

A full-stack crowdfunding platform for community events where users can create campaigns, add money to a wallet, contribute securely, and track event funding progress.

## Highlights

- JWT-based authentication and protected routes
- Admin approval flow for newly created events
- Wallet system for adding funds and making contributions
- Automatic event progress tracking
- Expired event handling with refund processing
- Admin dashboard for approvals, rejections, and platform stats

## Tech Stack

**Backend**
- Node.js
- Express.js
- MySQL
- JWT Authentication

**Frontend**
- React
- React Router
- Custom CSS

## Backend Focus

The backend is built around clear route-controller separation and raw SQL queries.

### Core modules
- **Auth** — signup, login, token verification
- **Events** — create event, fetch approved events, fetch personal events, event progress
- **Contributions** — contribute to an event from wallet balance
- **Transactions** — user transaction history
- **Wallet** — fetch wallet balance, add money
- **Admin** — approve/reject events, check pending events, view stats

## Database Focus

The database handles more than just storage — it powers important business logic.

### Implementations
- **Stored procedures** for wallet crediting and refund processing
- **Triggers** for automating related updates
- **Event status flow**: `pending -> approved -> funded / failed / rejected`
- **Refund system** for failed or expired events
- **Wallet balance management** tied directly to contribution flow

## Main Features

### User side
- Register and login
- Browse approved events
- View detailed event funding progress
- Create new event requests
- Add money to wallet
- Contribute to events
- View personal dashboard and transaction history

### Admin side
- Review pending event requests
- Approve or reject submissions
- Monitor all events
- Check expired events
- View overall platform stats

## Run Locally

```bash
# backend
cd backend
npm install
npm run dev
```

```bash
# frontend
cd frontend
npm install
npm run dev
```

## Notes

This project puts strong emphasis on backend logic and database-driven workflows, especially wallet handling, contribution safety, event expiry, and refund automation.
