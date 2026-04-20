import db from "../config/db.js"

export const getMyTransactions = async(req, res)=>{
     try {
          const userId = req.user.user_id;
          const [rows] = await db.query(
               `SELECT c.contribution_id, c.amount, c.created_at,
               e.title as event_title, e.event_id, e.status
               FROM Contributions c
               JOIN events e ON c.event_id = e.event_id 
               WHERE user_id = ?`,
               [userId]
          );
          res.json(rows);          
     } catch (err){
          console.error(err);
          res.status(500).json({error:"Failed to Fetch Transactions"});
     }
}