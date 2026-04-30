import db from "../config/db.js"

export const getWallet = async(req,res)=>{
try {
     const [rows] = await db.query(
          "SELECT wallet_balance FROM users WHERE user_id = ?",[req.user.user_id]);
     
     res.json(rows[0]);
} catch (err) {
     res.status(500).json({error:"Failed to fetch Wallet"});
}
}

export const addMoney = async(req,res)=>{
     try {
          const {amount} = req.body;

          await db.query("CALL add_money(?, ?)",[
               req.user.user_id,
               amount,
          ]);
          res.json({message:"Money added"});
     } catch (err) {
          res.status(500).json({error: err.message});
     }
}