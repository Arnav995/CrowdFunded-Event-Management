import jwt from "jsonwebtoken"

//VERIFY TOKEN
export const verifyToken = async(req,res, next)=>{
     const authHeader = req.headers.authorization;

     if(!authHeader){
          return res.status(401).json({error:"No Token Provided"});
     }
     try {
          // expect: Bearer <token>
          const token = authHeader.split(" ")[1];
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          req.user = decoded;
          next();
     } catch (err) {
          res.status(401).json({error:"Invalid Token"})
     }
}

export const isAdmin = async(req,res,next)=>{
     if(req.user.role !== "admin"){
          return res.status(403).json({error: "Not Authorized, Admin access only"})
     }
     next();
}    