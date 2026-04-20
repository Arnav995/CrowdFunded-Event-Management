import db from "../config/db.js";

export const getAdminStats = async(req,res)=>{
     try {
          const [[users]] = await db.query(
               `SELECT COUNT(*) as total_users FROM users`
          );
          const [[events]] = await db.query(
               `SELECT COUNT(*) as total_events FROM events`
          );
          // No of Approved Events
          const [[approved]] = await db.query(
               `SELECT COUNT(*) as approved_events FROM events WHERE status = 'approved'`
          );
          const [[funded]] = await db.query(
               `SELECT COUNT(*) as funded_events FROM events WHERE status = 'funded'`
          )
          const [[money]] = await db.query(
               `SELECT SUM(amount) as total_money FROM contributions`
          )

          res.json({
               total_users: users.total_users,
               total_events: events.total_events,
               approved_events: approved.approved_events,
               funded_events: funded.funded_events,
               total_money: money.total_money
          })

     } catch (err) {
          console.error(err);
          res.status(500).json({error:"Failed to fetch Admin Dashboard statistics"});
     }
}


export const getPendingEvents = async(req,res)=>{
     try {
          const [rows] = await db.query(`
               SELECT * FROM events WHERE status = 'pending'
               `)
               res.json(rows);
          } catch (err) {
          res.status(500).json({
               error:"Failed to fetch events"
          })
     }
}

export const getAllAdminEvents = async(req,res)=>{
     try {
          const [rows] = await db.query(`
               SELECT * FROM events`)
          res.json(rows);
     } catch (err) {
          console.error(err);
          res.status(500).json({error:`Failed to fetch events`});
     }
}
export const approveEvent = async(req,res)=>{
     try {    
          const {id} = req.params;
          await db.query(`UPDATE events SET status = 'approved'
               WHERE event_id=?`, [id]);
               res.json({message:"Event Approved Successfully"});

     } catch (err) {
          console.error(err);
          res.status(500).json({error:"Approval Failed"})
     }
}
export const rejectEvent = async(req,res)=>{
     try {    
          const {id} = req.params;
          await db.query(`UPDATE events SET status = 'rejected'
               WHERE event_id=?`, [id]);
          
          res.json({message:"Event Rejection Successful"});
     } catch (err) {
          console.error(err);
          res.status(500).json({error:"Rejection Failed"})
     }
}
export const getAllTransactions = async(req,res)=>{
try {
     const [rows] = await db.query(`
          SELECT c.contribution_id, c.user_id, c.amount, c.created_at,
          u.name as user_name, u.email, e.title as event_title, e.event_id
          FROM contributions c
          JOIN users u ON c.user_id = u.user_id 
          JOIN events e ON c.event_id = e.event_id   
          ORDER BY c.created_at DESC              
          `)
     res.json(rows);
} catch (err) {
     console.error(err);
     res.status(500).json({error:"Failed to get Transaction Log"});
     }
}