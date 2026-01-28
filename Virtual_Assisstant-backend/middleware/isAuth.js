import jwt from "jsonwebtoken";

export const isAuth = (req,res,next)=>{
  try {

    const token = req.cookies.token;

    if(!token){
      return res.status(401).json({message:"unauthorized"});
    }

    const verifyToken = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {id: verifyToken.id };

    next();

  } catch (error) {
    return res.status(401).json(error.message);
  }
};
