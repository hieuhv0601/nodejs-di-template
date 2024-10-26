/**
* author: HieuHV
* version: 1.0
*/
###Project Overview###
This project is structured following a layered architecture to ensure a clear separation of concerns. Each layer has a specific responsibility, making the codebase easier to maintain, extend, and test.

#Project Structure
project-root/
│   ├── All/                   # Contains sample data
│   ├── .env                   # Environment variables configuration
│   ├── app.js                 # Main application entry point
│   ├── db.js                  # MongoDB connection setup
│   ├── server.js              # Server initialization script
│   ├── package.json           # Project metadata and dependencies
│   ├── configs/               # Configuration files for application settings
│   ├── controllers/           # Handles incoming requests and returns responses
│   ├── middlewares/           # Middleware functions for request processing
│   ├── models/                # Defines the database models (MongoDB schemas)
│   ├── repositories/          # Handles direct data interactions with the database
│   ├── routes/                # Defines the API routes and their corresponding controllers
│   ├── services/              # Business logic layer
│   ├── utils/                 # Utility functions
│   ├── validators/            # Data validation methods
│   ├── .idea/                 # IDE configuration
│   ├── .vscode/               # Editor configuration (VSCode)


#Data Flow and Layer Descriptions
1. Repositories Layer
Description: This is the data access layer that interacts directly with the database using models. It is responsible for executing CRUD operations and database queries.
How to Use: Define repository methods to perform data operations on the models. For example:
**Code**
    // repositories/userRepository.js
    const User = require('../models/User');
    
    exports.findUserById = async (id) => {
      return await User.findById(id);
    };

***
Attention: Keep database queries here to maintain a clean separation from business logic. The repository layer should only contain raw data operations.

2. Services Layer
Description: Contains the business logic of the application. It retrieves data from repositories, applies business rules, and processes it before passing it to the controllers.
How to Use: Create service functions to handle the core logic of your application. For example:
**Code**
    // services/userService.js
    const { findUserById } = require('../repositories/userRepository');
    
    exports.getUserService = async (userId) => {
      const user = await findUserById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    };


***
Attention: Do not include database operations or HTTP-related logic here. Services should purely focus on the business rules and logic.

3. Controllers Layer
Description: This layer manages the HTTP requests and communicates with the service layer to process business logic. It handles all incoming API requests, invokes the necessary services, and sends back HTTP responses.
How to Use: Define controller methods that correspond to the various endpoints defined in the routes. For example:

**Code**
    // controllers/userController.js
    const { getUserService } = require('../services/userService');
    
    exports.getUser = async (req, res) => {
      try {
        const user = await getUserService(req.params.id);
        res.status(200).json(user);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };


***
Attention: Always handle errors gracefully within each controller method to prevent exposing internal server errors to the end user.


4. Routes Layer
Description: Defines the URL routes for your API and links them to the appropriate controllers. Routes serve as entry points to various functionalities of the application.
Can add middleware to support logic
How to Use: Create route files that map URLs to controller methods. For example:
**Code**
    // routes/userRoutes.js
    const express = require('express');
    const { getUser } = require('../controllers/userController');
    
    const router = express.Router();
    
    router.get('/user/:id', getUser);
    
    module.exports = router;


***
Attention: Use consistent naming conventions for routes and group related routes in their respective files.

5. Middlewares Layer
Description: Handles intermediary processing for HTTP requests such as authentication, logging, or input validation.
How to Use: Define middleware functions and apply them to specific routes. For example:
**Code**
    // middlewares/authMiddleware.js
    module.exports = (req, res, next) => {
      if (!req.headers.authorization) {
        return res.status(403).json({ message: 'No credentials provided' });
      }
      next();
    };


***
Attention: Ensure that sensitive middleware logic, such as authentication and authorization, is well-tested and secure.

#Additional Components

1. Models
Purpose: Defines the data structure using MongoDB schemas. These are not considered part of the service layers but serve as the foundation for data persistence.
How to Use: Create models that define the structure of your data using Mongoose. For example:
**Code**
    // models/User.js
    const mongoose = require('mongoose');
    
    const userSchema = new mongoose.Schema({
      name: String,
      email: String,
      age: Number
    });
    
    module.exports = mongoose.model('User', userSchema);


***

2. Configs
Purpose: Contains configuration settings such as database connection strings, API keys, and environment variables.
How to Use: Store global configuration settings in .env or in separate configuration files. For example:
**Code**
    // configs/dbConfig.js
    const mongoose = require('mongoose');
    const dbURI = process.env.DB_HOST;
    
    mongoose.connect(dbURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });



***

3. Validators
Purpose: Contains validation logic to check incoming data and payloads.
How to Use: Create validation functions or classes to verify the format of incoming data.
Remember that utils include the format for custom error and custom response

#Environment Configuration
The project is set up to automatically connect with MongoDB. Simply change the environment parameters in your .env file as required

Attention
The folder All contains sample data that may be used for testing purposes or initial setup.
Ensure that your environment variables are correctly configured in the .env file to avoid connection issues.
Always test your application thoroughly after making changes to the services, controllers, or middleware logic.