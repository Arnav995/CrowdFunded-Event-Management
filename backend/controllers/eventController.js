import db from "../config/db.js";

export const createEvent = async(req,res)=>{
     try {
          const{title, description, target_amount, deadline} = req.body;

          if(!title || !target_amount || !deadline){
               return res.status(400).json({
                    error:"Missing Required Fields"
               })
          } 
          await db.query(
               `INSERT INTO events
               (title,description, target_amount, deadline, status, created_by)
               VALUES(?,?,?,?, 'pending', ?)`,
               [title, description, target_amount, deadline, req.user.user_id]
          )
          res.status(201).json({
               message:"Event Request Submitted"
          });

     } catch (err) {
          console.error(err);
          res.status(500).json({
               error:"Failed to Create Event"
          });
     }
}
export const getApprovedEvent = async(req,res)=>{
     try {
          const [rows] = await db.query(
               `SELECT * FROM events WHERE status = 'approved'`
          );
          res.json(rows);
     } catch (err) {
          console.error(err)
          res.status(500).json({
               error:"Failed to fetch Approved Events"
          });
     }
}
export const getEventById = async(req,res)=>{
     try {
          const { id } = req.params;
          const [rows] = await db.query(
               `SELECT * FROM events WHERE event_id = ?`, [id]
          )
          if(rows.length === 0){
               return res.status(404).json({error:"Event Not Found"})
          }
          res.json(rows[0]);

     } catch (err) {
          console.error(err);
          res.status(500).json({error:"Failed to fetch event"});
     }
}
export const getUserEvents= async(req,res)=>{
     try {
          const [rows] = await db.query(
               "SELECT * FROM events WHERE created_by = ?",
               [req.user.user_id]
          )
          //res.json(rows[0]);
          res.json(rows);
     } catch (err) {
          console.error(err)
          res.status(500).json({error:"Failed to Fetch User's events"});
     }
}
export const checkExpiredEvents = async(req,res)=>{
     try {
          await db.query(`
               UPDATE events
               SET status = 'failed'
               WHERE deadline < NOW() 
               AND status = 'approved'
               `
          )
          res.json({message:"Expired Events Updated"})
     } catch (err) {
          console.error(err);
          res.status(500).json({error:"Failed to check Expired Events"});
     }
}
export const getEventProgress = async(req,res) => {
     try {
          const {id} = req.params;

          const [rows] = await db.query(
               `SELECT * FROM events WHERE event_id = ?`,[id]
          )
          if(rows.length === 0){
               return res.status(404).json({error:"Event not Found"})
          }
          const event = rows[0];

          const percentage= (event.current_amount / event.target_amount) * 100;
          
          res.json({
               target: event.target_amount,
               current: event.current_amount,
               percentage: Math.min(percentage, 100)
          });
     } catch (err) {
          console.error(err);
          res.status(500).json({error:"Unable to fetch Event Progress"});
     }
}

export const getEventContributors = async(req,res)=>{
     try {
          const { eventId } = req.params;
          const [rows] = await db.query(
               `SELECT u.name, c.amount, c.created_at
               FROM contributions c
               JOIN users ON c.user_id = u.user_id
               WHERE c.event_id = ?`,
               [id]
          )
     
     } catch (err){
          console.error(err);
          res.status(500).json({error:"Failed to fetch Event Contributors"})
     }
}