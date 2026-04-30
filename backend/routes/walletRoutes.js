import express from "express";
import { getWallet, addMoney } from "../controllers/walletController.js";
import {verifyToken} from "../middleware/authMiddleware.js"

const walletRouter = express.Router();

walletRouter.get("/",verifyToken,getWallet);
walletRouter.put("/add",verifyToken, addMoney);

export default walletRouter;