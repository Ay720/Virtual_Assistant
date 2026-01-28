import express from "express"
import { login, logout, signUp } from "../controller/auth.js"
const userrRouter = express.Router()

userrRouter.post("/signUp",signUp)
userrRouter.post("/login",login)
userrRouter.get("/logout",logout)

export default userrRouter