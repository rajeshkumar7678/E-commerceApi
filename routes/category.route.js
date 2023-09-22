const express=require("express")
const { categorymodel } = require("../model/category")

let catroute=express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     categorySchema:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           description: The name of the category.
 *           example: Electronics
 *         description:
 *           type: string
 *           description: A brief description of the category.
 *           example: Products related to electronics.
 */

catroute.get("/",(req,res)=>{
    res.send("category route")
})


/**
 * @swagger
 * /cat/allcat:
 *   get:
 *     summary: Get all categories
 *     description: Retrieve a list of all available categories.
 *     tags:
 *       - Category
 *     responses:
 *       200:
 *         description: List of categories retrieved successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 categories:
 *                   type: array
 *                   description: An array of category objects.
 *                   items:
 *                     $ref: '#/components/schemas/categorySchema'
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 */

catroute.get("/allcat",async(req,res)=>{
    try {
        let cat=await categorymodel.find()
        res.status(200).send({"categories":cat})
    } catch (error) {
        res.send(error)
    }
})



/**
 * @swagger
 * /cat:
 *   post:
 *     summary: Add a new category
 *     description: Add a new category with a name and description.
 *     tags:
 *       - Category
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the new category.
 *                 example: Electronics
 *               description:
 *                 type: string
 *                 description: A brief description of the new category.
 *                 example: Products related to electronics.
 *     responses:
 *       200:
 *         description: Category added successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   description: A success message.
 *                   example: Category added successfully.
 *       400:
 *         description: Category already present.
 *       500:
 *         description: Internal server error. Something went wrong on the server.
 */

catroute.post("/cat",async(req,res)=>{
    try {
        let {name,description}=req.body
        let cat=await categorymodel.findOne({name})
        if(cat){
            return res.status(400).send({"msg":"category already present"})
        }
        let newcat=new categorymodel({name,description})
        await newcat.save()
        console.log(newcat)
        res.status(200).send({"msg":"category added successfull"})
    } catch (error) {
        res.status(500).send(error.message)
    }
})



module.exports={
    catroute
}