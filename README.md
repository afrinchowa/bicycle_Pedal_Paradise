Bicycle Store API

A RESTful API for managing bicycles and orders. This application allows you to add, update, delete, and retrieve bicycle details, as well as manage customer orders. The API also includes revenue calculation from orders.


Features
Bicycle Management:

Add a new bicycle to the store.
View details of all bicycles.
Retrieve specific bicycle details by its ID.
Update bicycle details like price and quantity.
Delete a bicycle from the store.
Order Management:


Place an order for a bicycle.
Manage the stock when an order is placed (inventory is updated).
Calculate the total revenue generated from all orders.
Technologies Used
Backend: Node.js with Express
Database: MongoDB
ODM: Mongoose
Error Handling: Custom error handling middleware
Version Control: Git
API Endpoints

1. Bicycle Module
GET /api/products: Retrieve all bicycles.
GET /api/products/:productId: Retrieve a specific bicycle by ID.
POST /api/products: Add a new bicycle.
PUT /api/products/:productId: Update bicycle details.
DELETE /api/products/:productId: Delete a bicycle.

2. Order Module
POST /api/orders: Place a new order for a bicycle.
GET /api/revenue: Calculate total revenue from all orders.
Project Setup
Prerequisites
Make sure you have the following installed:

Node.js (v14 or higher)
MongoDB (or use MongoDB Atlas for cloud database)

Local Setup Instructions
Clone the repository:

bash

git clone https://github.com/your-username/bicycle-store-api.git
cd bicycle-store-api
Install dependencies: Install the required Node.js packages using npm or yarn:

bash

npm install
# or
yarn install
Set up environment variables: Create a .env file in the root of your project and add the following variables:

plaintext

DB_URI=mongodb://localhost:27017/bicycle-store
PORT=3000
DB_URI: Your MongoDB connection URI. If you're using a local MongoDB, this should be the default mongodb://localhost:27017.
PORT: The port the server will run on (default: 3000).
Start the server: Run the following command to start the server:

bash

npm start
# or
yarn start
The server will now be running at http://localhost:3000.

Postman Setup
To test the API with Postman:

Import the Postman collection (if available).

Use the following API routes:

GET /api/products to fetch all bicycles.
GET /api/products/:productId to fetch a specific bicycle by ID.
POST /api/products to create a new bicycle.
PUT /api/products/:productId to update a bicycle.
DELETE /api/products/:productId to delete a bicycle.
POST /api/orders to place an order.
GET /api/revenue to calculate the total revenue.
Example Request for Creating a Bicycle:
Endpoint: POST /api/products
Request Body:

{
  "name": "Roadster 5000",
  "brand": "SpeedX",
  "price": 300,
  "type": "Road",
  "description": "A premium road bike designed for speed and performance.",
  "quantity": 20,
  "inStock": true
}
Example Request for Placing an Order:
Endpoint: POST /api/orders
Request Body:

{
  "email": "customer@example.com",
  "product": "674211a6a8cd4b8aadf20eb6",  // Product ID of the bicycle
  "quantity": 2,
  "totalPrice": 600
}
Example Request for Calculating Revenue:
Endpoint: GET /api/revenue
Response:

{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 1200
  }
}
