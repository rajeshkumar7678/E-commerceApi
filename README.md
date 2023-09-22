# E-commerceApi

## Overview
The E-Commerce Platform is a comprehensive online shopping platform designed to provide users with an intuitive and seamless shopping experience. This project aims to create a feature-rich e-commerce website that allows users to browse, search, and purchase products from various categories

## Prerequisites

- Node.js and npm installed on your machine.
- MongoDB database.
  
# Installation
  - Clone the repository: git clone : https://github.com/rajeshkumar7678/E-commerceApi
  - Install dependencies: npm install
  - Start the server: npm run server
  
## Features

- **User Authentication**: Users can create accounts, log in, and manage their profiles.

- **Product Management**: Admins can add, edit, and remove products. Users can browse and search for products.

- **Shopping Cart**: Users can add products to their shopping cart, view the cart, update quantities, and remove items.

- **Order Placement**: Users can place orders based on the contents of their cart. Order records are created, and product quantities are deducted from stock.

- **Order History**: Users can view their past orders, including order details and status.

- **Product Reviews**: Users can leave reviews and ratings for products.

- **Categories**: Products are categorized for easy navigation.

- **Search Functionality**: Users can search for products by name, category, or keywords.

- **Payment Integration**: Integration with a payment gateway for secure transactions.

- **Responsive Design**: The platform is fully responsive, ensuring a seamless experience on various devices.
  
 # Table of contents
 
  ## QR-Insight/

  
    - controller/
       - db.js
    - middlewares/
       - auth.js
    - models/
       - usermodel.js
       - cart.model.js
       - order.model.js
       - productmodel.js
       - category.js
    - routes/
       - cart.route.js
       - category.route.js
       - order.route.js
       - product.route.js
       - user.routes.js
    - index.js
    - node_modules/
    - gitignore
    - package.json
    - README.md



  # Technologies Used

    This project was built using the following technologies:

   - Node.js
   - Express.js
   - MongoDB
   - Mongoose
   - JavaScript
   - bcrypt
   - JWT
    
  # Deployment

  - The backend of this project has been deployed using render, .
     - BackEnd :  https://e-commerceapi-ppy4.onrender.com/
     - Github  :  https://github.com/rajeshkumar7678/E-commerceAp
     - documentation : https://e-commerceapi-ppy4.onrender.com/doc



