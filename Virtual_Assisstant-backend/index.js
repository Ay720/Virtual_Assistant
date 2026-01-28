import express from "express"
import dotenv from "dotenv"
dotenv.config ()
import connectDb from "./config/db.js"
import authRouter from "./route/user.route.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import userRouter from "./route/user_route.js"
import geminiResponse from "./gemini.js"

const app = express()
const port = process.env.PORT
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))
app.use(express.json())
app.use(cookieParser())

app.use("/api/auth",authRouter)
app.use("/api/auth/user",userRouter)

    connectDb()
 
app.get("/",(req,res)=>
{
    res.send("HIIIII")
})
app.get('/gemini',async (req,res)=>{
    let prompt = req.query.prompt
    let data = await geminiResponse(prompt)
    res.send(data)
})

app.listen(port,()=>
{
    console.log("Server Created Successfully")
})