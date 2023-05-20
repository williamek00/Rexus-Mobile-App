
if(process.env.NODE_ENV !== "production"){
  require('dotenv').config
}

const express = require('express')
const app = express()
const port = process.env.PORT || 4001
const cors = require('cors')
const {connect} = require('./config/mongoConnection')
const userRouter = require('./routes/user')
const errorHandling = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use(errorHandling)

connect().then((db)=>{
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`)
      })
})

