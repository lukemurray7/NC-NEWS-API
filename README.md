# Northcoders News API

Northcoders News API is a RESTful api which is build using Express.js, Node.js, MongoDB and ejs. The MongoDB is hosted on mlabs, and the API is deployed through Heroku. 


## Getting Started


Here is a link to the [API](https://secret-beach-88841.herokuapp.com/).

The front end of this project can be found [here](https://northcoders-news-12345.herokuapp.com/)

## Prerequisites

```
    Node.js v7.0.0 or higher

    Mongo v3.4.2 or higher

```


## Installation

If you would like to download the project to run on your local machine follow these steps:

```
    Git clone https://github.com/lukemurray77/NC-NEWS-API.git ncnewsapi

    cd ncnewsapi

    npm install

```

Before starting the project, please open a second shell in your terminal and ensure mongoDB is running with the command:

``` 
    mongod
```

Once this is set up, you should be able to start the server. 

Run this command in the ncnewsapi directory on the command line.
```
    npm start
```

Navigate to [http://localhost:3000/](http://localhost:3000/) in your browser to see the API endpoints. 

## Testing

The API endpoints have been tested using Mocha, Chai and Supertest. To run the tests simply navigate to the ncnewsapi in your terminal and run : 

```
    npm test

```

## Built With

* [Express](https://expressjs.com/) 
* [MongoDB](https://www.mongodb.com/) - Document-oriented database system used
* [Mocha](https://mochajs.org/) - Node.js test framework
* [Chai](http://chaijs.com/) - TDD/BDD Assetion Library used
* [EJS](http://www.embeddedjs.com/) - Client side templating language
* [Supertest](https://github.com/visionmedia/supertest) - High-level abstraction for testing HTTP

