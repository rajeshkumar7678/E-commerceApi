const express=require("express")
const { productmodel } = require("../model/productmodel")
const productroute=express.Router()

/**
 * @swagger
 * components:
 *   schemas:
 *     productSchema:
 *       type: object
 *       properties:
 *         title:
 *           type: string
 *           description: The title or name of the product.
 *         price:
 *           type: number
 *           description: The price of the product.
 *         description:
 *           type: string
 *           description: A description of the product.
 *         availability:
 *           type: boolean
 *           description: Indicates whether the product is available or not.
 *         categoryid:
 *           type: string
 *           description: The ID of the category to which the product belongs.
 *       required:
 *         - title
 *         - price
 *         - categoryid
 */

productroute.get("/",(req,res)=>{
    res.send("product route")
})



/**
 * Add a new product to the inventory.
 *
 * @swagger
 * /pro/product:
 *   post:
 *     summary: Add a new product
 *     description: Create and add a new product to the inventory.
 *     tags:
 *       - Product
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title or name of the product.
 *               description:
 *                 type: string
 *                 description: A description of the product.
 *               price:
 *                 type: number
 *                 description: The price of the product.
 *               availablity:
 *                 type: boolean
 *                 description: Indicates whether the product is available or not.
 *               categoryid:
 *                 type: string
 *                 description: The ID of the category to which the product belongs.
 *             required:
 *               - title
 *               - price
 *               - categoryid
 *     responses:
 *       200:
 *         description: Product added successfully
 *       500:
 *         description: Internal server error
 *
 * @param {object} req - The request object.
 * @param {object} res - The response object.
 * @returns {object} The response indicating the success or failure of the operation.
 * @throws {Error} If there's an internal server error.
 */
//add products---------------------------------------------------------------
productroute.post("/product",async(req,res)=>{
    try {
        let {title,description,price,availablity,categoryid}=req.body
        
        let newproduct=new productmodel({title,description,price,availablity,categoryid})
        await newproduct.save()
        console.log(newproduct)
        res.status(200).send({"msg":"product added successfully"})
    } catch (error) {
        res.status(500).send(error.message)
    }
})


/**
 * @swagger
 *   /pro/product:
 *   get:
 *     summary: This route will show all the product 
 *     tags: [get]
 *     responses:
 *       200:
 *         description: show all the products.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/productSchema'
 */
//get all products-----------------------------------------------------------------
productroute.get("/product",async(req,res)=>{
    try {
        let products=await productmodel.find().populate("categoryid")
        res.status(200).send({"products":products})
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})





/**
 * @swagger
 *   /pro/product/:
 *   get:
 *     summary: This route will get the id from req.query and give the details
 *     tags: [get]
 *     responses:
 *       200:
 *         description: product details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               items:
 *                 $ref: '#/components/schemas/productSchema'
 */
//get the product by id-------------------------------------------------------------
productroute.get("/product/",async(req,res)=>{
    try {
        let {id}=req.query
        let product=await productmodel.findOne({_id:id}).populate("categoryid")
        res.status(200).send({"msg":product})
    } catch (error) {
        console.log(error)
        res.status(500).send(error.message)
    }
})









module.exports={
    productroute
}