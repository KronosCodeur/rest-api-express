const { PrismaClient } = require('@prisma/client')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const jwtSecret = process.env.JWT_SECRET_KEY;
const prisma = new PrismaClient()
const login = async (req, res) => {
    const { email, password } = req.body;
    try{
        const user = await prisma.user.findFirst({where: {email:email}});
        if(user){
            if (bcrypt.compareSync(password,user.password)){
                const token = jwt.sign(
                    { id: user.id,email:user.email},
                    jwtSecret,
                    { expiresIn: '7d' }
                );
                return res.status(200).json({message: "Login successful !!!", token: token,data: user});
            }
            return res.status(401).json({message: "Invalid credentials !!!"});
        }else{
            return res.status(404).json({message: "Invalid credentials or user not found !!!"});
        }
    }catch (error){
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}
const register = async (req, res) => {
    const  {email,name, password} = req.body;

    try{
        const existingUser = await prisma.user.findFirst({where: {email:email}});
        if(existingUser){
            return res.status(409).json({message: "User already exists !!!"});
        }
        await prisma.user.create({data: {email:email,name:name,password:bcrypt.hashSync(password, 10)}});
        return res.status(201).json({message: "Registration successful !!!"});
    }catch (error){
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}

module.exports = {
    login,
    register
}