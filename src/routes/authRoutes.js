const {login, register} = require("../controllers/authController");
const authRoutes = require('express').Router();

authRoutes.post('/login', login)
authRoutes.post('/register', register)
module.exports = authRoutes;