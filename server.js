const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongodb = require("./data/database");
const actorsRouter = require("./routes/actorsRoute");
const moviesRouter = require("./routes/movieRoute");
const bodyParser = require('body-parser');
app.use(bodyParser.json());
const errorHandler = require('./middleware/routeErrorHandler');




//ROUTES
app.get("/", (req, res) => {
    res.send("PROJECT 2 - DATABASE CONNECTED");
})
//USE OF SWAGGER UI
app.use('/', require('./routes/swagger'))
app.use("/actors", actorsRouter);
app.use("/movies", moviesRouter);

//MIDDLEWARE
app.use("/", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-control-Allow-Methods", "Origin", "X-Requested-With, Content-Type, Accept, Z-Key");
    res.setHeader("Access-control-Allow-Headrs", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})
app.use(errorHandler);

mongodb.initDb((err)=>{
    if(err){
        console.log(err)
    }
    else{
        app.listen(port, () => { console.log(`Database is running on port ${port}`);});
    }
});
