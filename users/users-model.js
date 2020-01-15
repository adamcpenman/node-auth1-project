const db = require("../database/db-config")
const bcrypt = require("bcryptjs")

 function find() {
     return db("users")
        .select("id", "username")  
 }

 module.exports = {
     find, 
 }
