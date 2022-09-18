require("dotenv").config();
const express=require("express")
const app=express()
const cors=require("cors")
const connection=require("./db")
const authRoutes=require("./routes/auth")
const userRoute=require("./routes/userRoute")
const userData=require("./routes/userData")
//databse
connection()

//middleware
app.use(express.json())
app.use(cors())


//routes
app.use("/api/users",userRoute)
app.use("/api/auth",authRoutes)



app.use("/api/userdata",userData)

const port=process.env.PORT || 5000

app.listen(port,()=>{
    console.log("Listening Port is " + port)
})