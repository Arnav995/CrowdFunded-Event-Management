import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { contributeToEvent, 
} from "../controllers/contributionControllers.js";

const contributionRouter = express.Router();

contributionRouter.post("/contribute", verifyToken, contributeToEvent);

export default contributionRouter;