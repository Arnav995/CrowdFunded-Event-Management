import express from "express"
import { getMyTransactions } from "../controllers/transactionController.js";
import {verifyToken} from "../middleware/authMiddleware.js"

const transactionRouter = express.Router();

transactionRouter.get("/my", verifyToken, getMyTransactions);

export default transactionRouter;