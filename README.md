# | Nodejs | MongoDB | Tests | Docker | 


## Requirement
To run this app, you will need to install Node and Docker on your machine


## How to run
Run `npm install`

Run `docker-compose up --build`.

Sever should be running on `http://localhost:3000`


## Routes

POST: `http://localhost:3000/location/create`

GET: `http://localhost:3000/locations`

GET: `http://localhost:3000/location/5e1b63a38a7195001bce5db5`

PUT: `http://localhost:3000/location/5e1b63a38a7195001bce5db5`

DELETE: `http://localhost:3000/location/5e1b63a38a7195001bce5db5`


NOTE: Import the postman collection `node_mongo_docker.postman_collection.json` on the root directory to see the samples CRUD requests


## Packages

body-parser, cors, dotenv, express, helmet, mongoose, mongoose-paginate-v2, morgan, chai, express-winston, mocha, nodemon, nyc, sinon, sinon-mongoose, supertest, winston