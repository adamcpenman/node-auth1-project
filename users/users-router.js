const express = require("express")
const usersModel = require("./users-model")
const bcrypt = require("bcryptjs")

const router = express.Router()

router.get("/users", async  (req, res, next) => {
const authError = {message: "You can't be here"}
   
        try {
            const {username, password} = req.headers
                if (!username || !password) {
                    return res.status(401).json(authError)
                  
                }
        const user = await usersModel.findBy({ username }).first()
            if (!user) {
                return res.status(401).json(authError)
            }
        const passwordValid = await bcrypt.compare(password, user.password)
            if (!passwordValid) {
                return res.status(401).json(authError)
            }

            const users = await usersModel.find()

            res.json(users)
        } catch(err) {
            next(err)
        }
})

module.exports = router