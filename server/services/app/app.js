if(process.env.NODE_ENV !== "production"){
  require('dotenv').config
}

const express = require('express')
const app = express()
const port =  process.env.PORT || 4002
const routerAdmin = require('./routes/admin')
const routerUser = require('./routes/user')
const cors = require('cors')
const errorHandling = require('./middlewares/errorHandler')


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(routerAdmin)
app.use(routerUser)
app.use(errorHandling)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})