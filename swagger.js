const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info:{
        title:"Actors Api",
        description:"Actors Api Documentation"
    },
    host:"localhost:8000",
    schemes:["http", "https"]
}

const outputFile = './swagger.json';
const endpointsFiles = ['server.js'];

swaggerAutogen(outputFile, endpointsFiles, doc);