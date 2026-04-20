import express from "express"
import { getAdminStats,
     approveEvent,
     rejectEvent,
     getPendingEvents,
     getAllAdminEvents,
     getAllTransactions
 } from "../controllers/adminController.js";
import {verifyToken, isAdmin} from "../middleware/authMiddleware.js"

const adminRouter = express.Router();

adminRouter.use(verifyToken, isAdmin)

// GET Website Statistics
adminRouter.get("/stats",getAdminStats)

adminRouter.get("/transactions",getAllTransactions);

adminRouter.get("/events/pending",getPendingEvents);

adminRouter.get("/events",getAllAdminEvents)

// REJECT AND APPROVE EVENTS
adminRouter.put("/events/:id/reject",rejectEvent);
adminRouter.put("/events/:id/approve",approveEvent);

export default adminRouter;