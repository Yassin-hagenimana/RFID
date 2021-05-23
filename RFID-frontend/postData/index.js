const express = require("express")
const PORT = process.env.PORT || 8000
//const bodyParser = require("body-parser")
const mongoose = require("mongoose")
const cors=require('cors')
const morgan=require("morgan")
const app = express()
const config=require("./config/db")
const cookieParser=require('cookie-parser')
const http = require('http')
const socketIo = require('socket.io')
mongoose.set("useCreateIndex", true)
mongoose
  .connect(config.database, {useNewUrlParser: true, useUnifiedTopology: true})
  .then(() => {
    console.log("Database connected successfully!!")
  }).catch(err => {console.log({ database_error: err })
})

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())
app.use(cookieParser());


const Routes=require("./routes/transaction")
const {getTransactions} = require("./controllers/transactionControllers")
app.use(Routes)

const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: '*',
  },
})


let interval
io.on('connection', (socket) => {
  console.log('New client connected')
  if (interval) {
    clearInterval(interval)
  }

  interval = setInterval(() => emit(socket), 3000)
  socket.on('disconnect', () => {
    console.log('Client disconnected')
    clearInterval(interval)
  })
})


const emit = async (socket) => {
  let response = await getTransactions()
  socket.emit('Transactions', response.transactions || [])
}



app.use("/Transactions",Routes);
app.get("/", (req, res) => {
  res.send({message:"Welcome "})
})


server.listen(PORT, () => {
console.log(`Application is running on port ${PORT}`)
})