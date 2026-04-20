import db from "../config/db.js";


export const contributeToEvent = async(req,res)=>{

     try {
          const {event_id, amount } = req.body;
     
          const user_id = req.user.user_id;// this improves security 
          // user now wont send user_id in body
          // also helps to prevent fake contributions(if thats a concern)


          // in case any field among these is empty
          if(!event_id || !amount){
               return res.status(400).json({
                    error:"Missing Fields"
               });
          }    
          // FETCH THE EVENT
          const [eventRows] = await db.query(
               `SELECT * FROM events WHERE event_id=?`,
               [event_id]
          )
          if(eventRows.length === 0){
               return res.status(400).json({error:"Event Not Found"})
          }

          const event = eventRows[0];

          // If event status is NOT APPROVED, therefore its not open for funding yet
          if(event.status !== "approved"){
               return res.status(400).json({
                    error:"Event hasn't been approved yet, So not open for funding"
               })
          }

          // If DEADLINE has passed => Therefore, user can't contribute
          if(new Date() > new Date(event.deadline)){
               return res.status(400).json({error:"Event Deadline is Over!"});
          }

          // CALL Procedure
          await db.query(
               "CALL contribute_to_event(?,?,?)",
               [user_id,event_id,amount]
          );

          // HANDLING FUNDING TO NOT GO ABOVE Target Amount
          const [updated] = await db.query(
               `SELECT current_amount, target_amount FROM events WHERE event_id = ?`,
               event_id
          )
          if(updated[0].current_amount >= updated[0].target_amount){
               await db.query(`
                    UPDATE events SET status = 'funded' WHERE event_id = ?`,
               [event_id]);
          }

          res.status(200).json({
               message:"Contribution Successful!"
          });
     } catch (err) {
          console.error(err);
          res.status(500).json({
               message:"Contribution Failed",
               error:err.message
          });
     }

}