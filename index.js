const express = require("express")
const helmet = require("helmet")

const server = express()
const port = process.env.PORT || 4000

server.use(helmet())
server.use(express.json())

server.get("/", (req, res) => {
    res.send("<h2>NODE AUTH1 PROJECT</h2>")
})

server.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
})