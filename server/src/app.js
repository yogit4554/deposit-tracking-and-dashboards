import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app=express()
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials:true
}))

app.use(express.json({limit:"16kb"}))// json file inpit

app.use(express.urlencoded({extended:true,limit:"16kb"}))

app.use(express.static("public"))
app.use(cookieParser())


// routes import 
import userRouter from "./routes/user.routes.js"
import employeeRouter from "./routes/employee.routes.js"

app.use("/api/v1",userRouter)  /// http://localhost:8000/api/v1/
app.use("/api/v1", employeeRouter)

export {app}