const express = require('express')
require('dotenv').config()
const teacherRoutes = require("./routes/teachers.routes")
require("./adapter/connectionDB")



let app = express()

app.use(express.json())

app.use("/api/teacher", teacherRoutes)


// !page not found middleware
app.use("*", (req, res, next) => {
    res.status(404).json({ message: "Page not found" })
})

// !error handling middleware
app.use((err, req ,res, next)=> {
    res.status(400).json({error:true,message:err.message,data:"ok"})
})


app.listen(process.env.PORT, () => {
    console.log(`Server is running at PORT ${process.env.PORT}`)
})