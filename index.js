const express = require("express")
const helmet = require("helmet")
const cors = require("cors")
const sessions = require("express-session")
const KnexSessionStore = require("connect-session-knex")(sessions) //store sessions in database


const usersRouter = require("./users/users-router")
const authRouter = require("./auth/auth-router")
const dbConfig = require('./database/db-config')

const server = express()
const port = process.env.PORT || 4000

const sessionConfig = {
  //session storage options
  name: "Gaga", //default would be sid
  secret: "All Tea, All Shade",//used for encryption (must be an environment variable)
  saveUninitialized: false, //GDPR laws against setting cookies automatically
  resave: false, //keep it false to avoid recreating sessions that have not changed

  //how to store session
  store: new KnexSessionStore({ //do not forget THE new KEYWORD
    knex: dbConfig, ////configure instance of knex
    createTable: true, // if the table does not exist in the db, creates automatically
    // defaults to 6000 ms clearInterval: 
    sidfieldname: "sid",
  }),

  //ccokie options
  cookie: {
    maxAge: 1000 * 60 * 10, // 10 mins in milliseconds
    secure: false, //in production, this should be true so cookie header is encrypted
    httpOnly: true, // if true JS cannont access cookie
  }
}

server.use(helmet())
server.use(cors())
server.use(express.json())
server.use(sessions(sessionConfig)) //add a req session


server.use("/api", usersRouter)
server.use("/api", authRouter)

server.get("/", ( req, res, err) => {
    res.send("<h2>NODE AUTH1 PROJECT</h2>")
})

server.use((err, req, res, next) => {
  console.log("Error:", err)

  res.status(500).json({
    message: "Something went wrong",
  })
})

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})