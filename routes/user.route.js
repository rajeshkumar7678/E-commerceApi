const express=require("express")
const { usermodel } = require("../model/usermodel")
const userroute=express.Router()
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


/**
 * @swagger
 * components:
 *   schemas:
 *     userSchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the user.
 *         email:
 *           type: string
 *           description: The email address of the user.
 *         password:
 *           type: string
 *           description: The password of the user.
 *       required:
 *         - name
 *         - email
 *         - password
 */


userroute.get("/",(req,res)=>{
    res.send("userroutes")
})


/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register a new user
 *     description: Register a new user and add their information to the database.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userSchema'
 *     responses:
 *       200:
 *         description: User registration successful. Please log in.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/userSchema'
 *       400:
 *         description: User with the same email already exists.
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 *     security:
 *       - jwt_token: [] # Add the security scheme name and scopes if applicable.
 */

userroute.post("/register",async (req,res)=>{
    try {
        let {name,email,password}=req.body
        let user=await usermodel.findOne({email})
        
        if(user){
            return res.status(400).send({"msg":"user already present"})
        }
        let hashpass=bcrypt.hashSync(password,5)
        if(!hashpass){
            return res.send("error")
        }
        let newuser=new usermodel({name,email,password:hashpass})
        await newuser.save()
        res.status(200).send({"msg":"user registration successful! please logon"})
    } catch (error) {
        res.status(500).send(error.message)
    }
})



/**
 * @swagger
 * /user/login:
 *   post:
 *     summary: Log in as an existing user
 *     description: Authenticate and log in as an existing user.
 *     tags:
 *       - User
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: The email address of the user.
 *                 example: user@example.com
 *               password:
 *                 type: string
 *                 description: The user's password.
 *                 example: mypassword123
 *     responses:
 *       200:
 *         description: Login successful. Token generated.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message.
 *                   example: Login successful
 *                 token:
 *                   type: string
 *                   description: An authentication token.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
 *       400:
 *         description: User not found or incorrect password.
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 *     security:
 *       - jwt_token: [] # Add the security scheme name and scopes if applicable.
 */

userroute.post("/login",async(req,res)=>{
    try {
        let {email,password}=req.body
        let user=await usermodel.findOne({email})

        if(!user){
            return res.status(400).send({"msg":"user not present register first"})
        }
        let hashpass=await bcrypt.compare(password,user.password)
        if(!hashpass){
            return res.status(400).send({"msg":"password incorrect"})
        }
        
        let token=jwt.sign({id:user._id},"rajesh",{expiresIn:"6h"})
        res.status(200).send({"msg":"login successfull","token":token})
    } catch (error) {
        res.status(500).send(error.message)
    }
})






module.exports={
    userroute
}