import { isAuth } from "../middleware/isAuth.js"
import upload from "../middleware/multer.js"
import express from "express"
import { askToAssisstant, getCurrentUser, updateAssisstant } from "../controller/user.controller.js"


const userRouter = express.Router()

    
userRouter.get("/current",isAuth,getCurrentUser)
userRouter.post("/update",isAuth,upload.single("assistantImage"),updateAssisstant)
userRouter.post("/askToAssistant",isAuth,askToAssisstant)
export default userRouter