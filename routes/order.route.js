const express=require("express")
const { auth } = require("../middleware/auth.middleware")
const { cartmodel } = require("../model/cart.model")
const { ordermodel } = require("../model/order.model")

const orderroute=express.Router()


/**
 * @swagger
 * components:
 *   schemas:
 *     orderSchema:
 *       type: object
 *       properties:
 *         user:
 *           type: string
 *           description: The ID of the user who placed the order.
 *         item:
 *           type: array
 *           description: An array of objects representing ordered products and quantities.
 *           items:
 *             type: object
 *             properties:
 *               product:
 *                 type: string
 *                 description: The ID of the product.
 *               quantity:
 *                 type: integer
 *                 description: The quantity of the product ordered.
 *         total:
 *           type: number
 *           description: The total cost of the order.
 *         status:
 *           type: string
 *           description: The status of the order.
 *           enum:
 *             - pending
 *             - delivered
 *             - shipped
 *       required:
 *         - user
 *         - item
 *         - total
 */

orderroute.get("/",auth,(req,res)=>{
    res.send("order route")
})


/**
 * @swagger
 * /order/place:
 *   post:
 *     summary: Place an order
 *     description: Create a new order based on the contents of the user's cart.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userid:
 *                 type: string
 *                 description: The ID of the user placing the order.
 *             required:
 *               - userid
 *     responses:
 *       200:
 *         description: Order placed successfully
 *       400:
 *         description: Bad request, user's cart is empty
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */

orderroute.post("/place",auth,async(req,res)=>{
    try {
        let {userid}=req.body
        let cart=await cartmodel.findOne({user:userid}).populate("item.product");
        if(!cart || cart.item.length==0){
            return res.status(400).send({ "msg": "Cart is empty" });
        }

        const total = cart.item.reduce((acc, item) => {
            return acc + item.product.price * item.quantity;
        }, 0);
        console.log(total)

        const order=new ordermodel({
            user:userid,
            item:cart.item.map((item) => ({
                product: item.product._id,
                quantity: item.quantity,
            })
            ),
            total
        })

        await order.save()
        cart.item=[]
        await cart.save()


        res.status(200).send({"msg":"oder place successfull"})
    } catch (error) {
        res.status(500).send(error.message)
    }
})




/**
 * @swagger
 * /order/history:
 *   get:
 *     summary: Get the order history of the authenticated user
 *     description: Retrieve the order history of the authenticated user, including order details and status.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Order history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/orderSchema'
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */

orderroute.get("/history",auth,async(req,res)=>{
    try {
        let{userid}=req.body
        let order=await ordermodel.find({user:userid}).populate("item.product")
        res.status(200).send(order)
    } catch (error) {
        res.status(500).send(error.message)
    }
})


/**
 * @swagger
 * /order/{orderid}:
 *   get:
 *     summary: Get detailed information about a specific order
 *     description: Retrieve detailed information about a specific order by its ID, including order items, user details, and status.
 *     tags:
 *       - Order
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: orderid
 *         in: path
 *         description: ID of the order to retrieve
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Order details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 orderdetails:
 *                   $ref: '#/components/schemas/orderSchema'
 *       404:
 *         description: Order not found
 *       401:
 *         description: Unauthorized, user not authenticated
 *       500:
 *         description: Internal server error
 */

orderroute.get("/order/:orderid",auth,async(req,res)=>{
    try {
        let {orderid}=req.params
        let order=await ordermodel.findById(orderid).populate("item.product").populate("user")

        if (!order) {
            return res.status(404).send({ "msg": "Order not found" });
        }

        res.status(200).send({"orderdetails":order})
    } catch (error) {
        res.status(500).send(error.message)
    }
})
















module.exports={
    orderroute
}