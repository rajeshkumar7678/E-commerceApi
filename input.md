input and output for reference-----------------------


//signup-------------------------------
http://localhost:4545/user/register
{
        "email": "rajesh@gmail.com",
        "password": "rajesh",
        "name":"rajesh"
}


//login-------------------------------
http://localhost:4545/user/login
{
        "email": "rajesh@gmail.com",
        "password": "rajesh"
}


//allcategory--------------------------
http://localhost:4545/cat/allcat
output={
  "categories": [
    {
      "_id": "650c724d9dfbbc1e0b7e38af",
      "name": "jeans",
      "description": "jeans for boys and girls",
      "__v": 0
    },
    {
      "_id": "650c72ae9dfbbc1e0b7e38b3",
      "name": "shirt",
      "description": "shirt for boys and girls",
      "__v": 0
    },
    {
      "_id": "650c73287aa083ed696b12ec",
      "name": "t-shirt",
      "description": "t-shirt for boys and girls",
      "__v": 0
    },
    {
      "_id": "650d621bbb2f22f53d56ee24",
      "name": "electronics",
      "description": "all electronic devices",
      "__v": 0
    }
  ]
}



//addcategory--------------------------------
http://localhost:4545/cat/cat
{
        "name": "electronics",
        "description": "all electronic devices"
}


//get all products------------------------------------------
http://localhost:4545/pro/product
output={
  "products": [
    {
      "_id": "650c7c911b0b0bcf37877e01",
      "title": "abc shirt",
      "price": 1200,
      "description": "abc shirt for both boys and girl",
      "availablity": true,
      "category": "650c73287aa083ed696b12ec",
      "__v": 0
    },
    {
      "_id": "650c7e658e8ee8268394f492",
      "title": "denin shirt",
      "price": 1200,
      "description": "denin shirt for both boys and girl",
      "availablity": true,
      "categoryid": {
        "_id": "650c73287aa083ed696b12ec",
        "name": "t-shirt",
        "description": "t-shirt for boys and girls",
        "__v": 0
      },
      "__v": 0
    },
    {
      "_id": "650c7e9d8e8ee8268394f496",
      "title": "denin t-shirt",
      "price": 1200,
      "description": "denin t-shirt for both boys and girl",
      "availablity": true,
      "categoryid": {
        "_id": "650c73287aa083ed696b12ec",
        "name": "t-shirt",
        "description": "t-shirt for boys and girls",
        "__v": 0
      },
      "__v": 0
    },
    {
      "_id": "650c7edf8e8ee8268394f499",
      "title": "v-look t-shirt",
      "price": 1200,
      "description": "v-look t-shirt for both boys and girl",
      "availablity": true,
      "categoryid": {
        "_id": "650c73287aa083ed696b12ec",
        "name": "t-shirt",
        "description": "t-shirt for boys and girls",
        "__v": 0
      },
      "__v": 0
    },
    {
      "_id": "650c7f368e8ee8268394f49c",
      "title": "jeans",
      "price": 1200,
      "description": "jeans for both boys and girl",
      "availablity": true,
      "categoryid": {
        "_id": "650c724d9dfbbc1e0b7e38af",
        "name": "jeans",
        "description": "jeans for boys and girls",
        "__v": 0
      },
      "__v": 0
    },
    {
      "_id": "650c7f508e8ee8268394f49f",
      "title": "rough-jeans",
      "price": 1200,
      "description": "rough-jeans for both boys and girl",
      "availablity": true,
      "categoryid": {
        "_id": "650c724d9dfbbc1e0b7e38af",
        "name": "jeans",
        "description": "jeans for boys and girls",
        "__v": 0
      },
      "__v": 0
    }
  ]
}

//add product--------------------------------
http://localhost:4545/pro/product
{
        "title": "phone",
        "description": "motorola mobile",
        "price":23000,
        "availablity":true,
        "categoryid":"650d621bbb2f22f53d56ee24"
}


//get product by id--------------------------------
http://localhost:4545/pro/product/650d67012234f42e98076558
output={
  "msg": {
    "_id": "650d67012234f42e98076558",
    "title": "phone",
    "price": 23000,
    "description": "motorola mobile",
    "availablity": true,
    "categoryid": {
      "_id": "650d621bbb2f22f53d56ee24",
      "name": "electronics",
      "description": "all electronic devices",
      "__v": 0
    },
    "__v": 0
  }
}


//add product to cart-------------------------------
http://localhost:4545/cart/add
{
        "productid": "650d67012234f42e98076558",
        "quantity": 2
}

//get all cart data--------------------------------------
http://localhost:4545/cart/cart
[
  {
    "_id": "650d68bbeec24cf67a9fcb4f",
    "user": "650d602ebb2f22f53d56ee1f",
    "item": [
      {
        "product": {
          "_id": "650d67012234f42e98076558",
          "title": "phone",
          "price": 23000,
          "description": "motorola mobile",
          "availablity": true,
          "categoryid": "650d621bbb2f22f53d56ee24",
          "__v": 0
        },
        "quantity": 2,
        "_id": "650d68bbeec24cf67a9fcb50"
      }
    ],
    "__v": 0
  }
]

//update data to cart-----------------------------------
http://localhost:4545/cart/cart/650c7f508e8ee8268394f49f
{
        "productid": "650c7f508e8ee8268394f49f",
        "quantity": 5
}

//deletedata from cart------------------------------------
http://localhost:4545/cart/cart/650c7f508e8ee8268394f49f


//order place-----------------------------------------------------
http://localhost:4545/order/place



//order history-----------------------------------------------------------
http://localhost:4545/order/history



//oder by id---------------------------------------------
http://localhost:4545/order/order/650d87476340c05f26cb0e35


