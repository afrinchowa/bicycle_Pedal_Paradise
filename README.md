Objective:
Develop an Express application with TypeScript, integrating MongoDB with Mongoose to manage a Bicycle Store. Ensure data integrity using Mongoose schema validation.

Project Setup:
Create an Express project with TypeScript.
Set up a MongoDB database to store Products (bicycles) and Orders.
Use Mongoose for schema definition and data operations.
Implement CRUD operations for both bicycles and orders.
Models:
Product Model (Bicycle):
name (string): The name of the bicycle.
brand (string): The brand of the bicycle.
price (number): Price of the bicycle.
type (string): The type of bicycle (e.g., Mountain, Road, Hybrid, BMX). Use an enum: Mountain, Road, Hybrid, BMX, Electric.
description (string): A brief description of the bicycle.
quantity (number): Quantity of the bicycle available.
inStock (boolean): Indicates if the bicycle is in stock.
Order Model:
email (string): The email address of the customer.
product (ObjectId): The bicycle ordered. (unused ref)
quantity (number): The quantity of the ordered bicycle.
totalPrice (number): The total price (bicycle price * quantity).
Generic Error Response:
message: A brief error message explaining what went wrong.
success: Set to false for error responses.
error: The error message or error object returned by the application (e.g., "ValidationError", "Resource not found").
stack: The stack trace showing where the error occurred in the code.
Example:
{
  "message": "Validation failed",
  "success": false,
  "error": {
    "name": "ValidationError",
    "errors": {
      "price": {
        "message": "Price must be a positive number",
        "name": "ValidatorError",
        "properties": {
          "message": "Price must be a positive number",
          "type": "min",
          "min": 0
        },
        "kind": "min",
        "path": "price",
        "value": -5
      }
    }
  },
  "stack": "Error: Something went wrong\n    at app.js:23:13\n    at..."
}
Main Section (50 Marks):
1. Create a Bicycle
Endpoint: /api/products
Method: POST
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
Response: Success message and created bicycle details.
{
  "message": "Bicycle created successfully",
  "success": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Roadster 5000",
    "brand": "SpeedX",
    "price": 300,
    "type": "Road",
    "description": "A premium road bike designed for speed and performance.",
    "quantity": 20,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
2. Get All Bicycles
Endpoint: /api/products
Method: GET
Response: A list of all bicycles with details like name, brand, price, type, etc.
Query: /api/products?searchTerm=type (searchTerm can be name, brand, type)
{
  "message": "Bicycles retrieved successfully",
  "status": true,
  "data": [
    {
      "_id": "648a45e5f0123c45678d9012",
      "name": "Roadster 5000",
      "brand": "SpeedX",
      "price": 300,
      "type": "Road",
      "description": "A premium road bike designed for speed and performance.",
      "quantity": 20,
      "inStock": true,
      "createdAt": "2024-11-19T10:23:45.123Z",
      "updatedAt": "2024-11-19T10:23:45.123Z"
    }
  ]
}
3. Get a Specific Bicycle
Endpoint: /api/products/:productId
Method: GET
Response: The details of a specific bicycle by ID.
{
  "message": "Bicycle retrieved successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Roadster 5000",
    "brand": "SpeedX",
    "price": 300,
    "type": "Road",
    "description": "A premium road bike designed for speed and performance.",
    "quantity": 20,
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T10:23:45.123Z"
  }
}
4. Update a Bicycle
Endpoint: /api/products/:productId
Method: PUT
Request Body: (Bicycle details to update)
{
  "price": 350,
  "quantity": 15
}
Response: Success message and updated bicycle details.
{
  "message": "Bicycle updated successfully",
  "status": true,
  "data": {
    "_id": "648a45e5f0123c45678d9012",
    "name": "Roadster 5000",
    "brand": "SpeedX",
    "price": 350, // Price updated
    "type": "Road",
    "description": "A premium road bike designed for speed and performance.",
    "quantity": 15, // Quantity updated
    "inStock": true,
    "createdAt": "2024-11-19T10:23:45.123Z",
    "updatedAt": "2024-11-19T11:00:00.000Z" // Updated timestamp
  }
}
5. Delete a Bicycle
Endpoint: /api/products/:productId
Method: DELETE
Response: Success message confirming the bicycle has been deleted.
{
  "message": "Bicycle deleted successfully",
  "status": true,
  "data": {}
}
6. Order a Bicycle
Endpoint: /api/orders
Method: POST
Inventory Management Logic:
When an order is placed, reduce the quantity in the product model.
If the inventory quantity goes to zero, set inStock to false.
Handle insufficient stock cases by returning an appropriate error message.
Request Body:
{
  "email": "customer@example.com",
  "product": "648a45e5f0123c45678d9012",
  "quantity": 2,
  "totalPrice": 600
}
Response: Success message confirming the order.
{
  "message": "Order created successfully",
  "status": true,
  "data": {
    "_id": "648b45f5e1234b56789a6789",
    "email": "customer@example.com",
    "product": "648a45e5f0123c45678d9012",
    "quantity": 2,
    "totalPrice": 600,
    "createdAt": "2024-11-19T12:00:00.000Z",
    "updatedAt": "2024-11-19T12:00:00.000Z"
  }
}
7. Calculate Revenue from Orders (Aggregation)
Endpoint: /api/orders/revenue
Method: GET
Aggregation Suggestion:
Use MongoDB aggregation pipeline to calculate the total revenue from all orders.
Calculate the total price by multiplying the price of each bicycle by the quantity ordered.
Response: The total revenue from all orders.
{
  "message": "Revenue calculated successfully",
  "status": true,
  "data": {
    "totalRevenue": 1200 // Total revenue calculated from all orders
  }
}
Bonus Section (10 Marks):
Code Quality:
Write clean, well-documented code.
Use meaningful variable and function names.
API Structure:
API endpoints should be the same as we have provided. If you don't follow the API structure and response structure your mark will be deducted.
Follow the API structure exactly as outlined above.
Ensure request and response formats match the specifications.
Error Handling:
Implement proper error handling for scenarios like invalid input, missing data, and insufficient stock.
Not Found: If a book or order is not found, return a 404 error with an appropriate message.
Validation Errors: Return specific error messages for validation failures (e.g., invalid email, insufficient stock).
Video Explanation:
Record a video explaining the key features of your Book Store API and the logic behind its design and test APIs.
Submission:
GitHub Repository Link
Live Deployment Link
Video Explanation (Public Link)
Professional README file with features of your application and instructions on setting up the project locally.