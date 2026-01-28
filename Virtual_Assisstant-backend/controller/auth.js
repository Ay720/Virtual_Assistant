
import genToken from "../config/token.js";
import User from "../models/user_model.js";
import bcrypt from "bcrypt"
export const signUp = async(req,res)=>

{
try {
        const{name,email,password} = req.body;
        const existEmail = await User.findOne({email:email})
        if(existEmail)
        {
            console.log(req.body)
            return res.status(400).json({
                message:"Email already exists!",
                
            })
            
        }
        if(password.length<6)
        {
            return res.status(400).json({
                message:"length should gretaer than 6"
            })
            
        }
        const hashedPassword = await bcrypt.hash(password,10)
        console.log("hii")
         
        const user = await User.create({name,password:hashedPassword,email})
        console.log(user)
        const token = await genToken(user._id)
        res.cookie("token",token,
        {
            httpOnly:true,
            maxAge:7*24*60*60*1000,
            sameSite:"strict",
            secure:false
        })
        return res.status(201).json(user)
    } 

catch (error) {
    console.log(error)
return res.status(500).json({
    message:`sign up error ${error}`
}    )

}    
}



export const login = async (req,res)=>{
  try {

    const { email, password } = req.body;

    const user = await User.findOne({ email }).select("+password");

    if(!user){
      return res.status(400).json({ message:"Email not exists!" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if(!isMatch){
      return res.status(400).json({ message:"Password is wrong!" });
    }

    const token = genToken(user._id);   

    res.cookie("token", token, {
      httpOnly:true,
      maxAge:7*24*60*60*1000,
      sameSite:"strict",
      secure:false
    });

    return res.status(200).json({ user, token });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};




export const logout = async(req,res)=>
{
    try {
        res.clearCookie("token")
        return res.status(200).json({
    message:"logout successfully"
}    )
    } catch (error) {
        return res.status(500).json({
    message:"logout  error ${error}"
}    )
    }
}
