import dotenv from "dotenv";
dotenv.config();

import express from "express"
import cors from "cors"
import db from "./config/db.js";
import contributionRouter from "./routes/contributionRoutes.js"
import transactionRouter from "./routes/transactionRoutes.js";
import adminRouter from "./routes/adminRoutes.js";
import eventRouter from "./routes/eventRoutes.js";
import authRouter from "./routes/authRoutes.js"
import walletRouter from "./routes/walletRoutes.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

app.get("/",(req,res)=>{
     res.send(`Backend is running `);
})

app.use("/api",contributionRouter);

app.use("/api/auth", authRouter);// login and signup

app.use("/api/transactions", transactionRouter);

app.use("/api/wallet", walletRouter);

app.use("/api/events",eventRouter);

app.use("/api/admin", adminRouter);

const PORT = process.env.PORT;

app.listen(PORT, ()=>{
     console.log(`Server Running http://localhost:${PORT}`);
})