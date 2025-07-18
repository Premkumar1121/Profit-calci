Profit Project

#### Backend

This is the backend server for the Profit project, responsible for calculating profit using various parameters such as distance, weight, and priority. It connects to a MongoDB instance to retrieve cost configuration data and calls a Java-based profit calculator.

##### Features

•  Calculate Profit: Expose an endpoint to calculate profit based on input parameters.
•  View Costs: Retrieve current cost configuration from the database.
•  Environment Configurations: Utilizes dotenv for environment variables.

##### Technologies Used

•  Node.js: JavaScript runtime
•  Express: Web framework for Node.js
•  Mongoose: ODM for MongoDB
•  Java: External CLI for calculations

#### Frontend

This is the frontend part of the Profit project, built with Angular. It provides a user interface to interact with the backend API.

##### Features

•  Profit Calculation Interface: Allows users to input parameters for calculation.

##### Technologies Used

•  Angular: Framework for building client applications in HTML and TypeScript

#### Setup Instructions

1. Backend:
•  Install dependencies: npm install
•  Start the server: npm start
•  Ensure MongoDB is running and accessible
2. Frontend:
•  Navigate to frontend/ProfitCalci
•  Install dependencies: npm install
•  Run the frontend application: ng serve