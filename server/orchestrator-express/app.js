const express = require('express')
const app = express()
const port = 4000
const userRouter = require('./routes/userRouter')
const appRouter = require('./routes/appRouter')


app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(userRouter)
app.use(appRouter)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})