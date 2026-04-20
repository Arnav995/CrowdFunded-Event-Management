import express from "express"
import { getEventProgress } from "../controllers/eventController.js";
import { getEventContributors,
     createEvent
 } from "../controllers/eventController.js";

import{
     checkExpiredEvents,
     getEventById,
     getUserEvents,
     getApprovedEvent
} from "../controllers/eventController.js";
import {verifyToken} from "../middleware/authMiddleware.js"

const eventRouter = express.Router();



// PUBLIC GET
// Homepage thing
eventRouter.get("/approved",getApprovedEvent)

// GET user's personal events 
eventRouter.get("/my-events", verifyToken,getUserEvents)


// ADMIN / SYSTEM
eventRouter.put("/check-expired", checkExpiredEvents);

// CREATE AND EVENT POST Req
eventRouter.post("/", verifyToken,createEvent)


eventRouter.get("/:id/progress",getEventProgress);

eventRouter.get("/:id/contributors",getEventContributors);

//PUBLIC GET
eventRouter.get("/:id",getEventById); // Always at Last

export default eventRouter;