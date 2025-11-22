const express = require('express');
const app = express();
const port = process.env.PORT || 8000;
const mongodb = require("./data/database");
const actorsRouter = require("./routes/actorsRoute");
const moviesRouter = require("./routes/movieRoute");
const bodyParser = require('body-parser');
const errorHandler = require('./middleware/routeErrorHandler');
const passport = require('passport')
const session = require('express-session')
const GitHubStrategy = require('passport-github2').Strategy;
const cors = require('cors');
const client = require('react-dom/client');

app
    .use(bodyParser.json())
    .use(session({
        secret: 'secret',
        resave: false,
        saveUninitialized: true,       
    }))
    //init passport on every route
    .use(passport.initialize())
    // allow passport to use session
    .use(passport.session());

    

//ROUTES
/*app.get("/", (req, res) => {
    res.send("PROJECT 2 - DATABASE CONNECTED");
})*/
//USE OF SWAGGER UI
app.use('/', require('./routes/swagger'))
// ROUTES SETUP
app.get('/login', passport.authenticate('github'), (req, res) => {});
app.use("/actors", actorsRouter);
app.use("/movies", moviesRouter);
app.get('/logout', function(req, res, next){
    req.logOut(function(err){
        if (err){return next (err);}
        res.redirect('/')
    });
});
//MIDDLEWARE

app.use("/", (req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-control-Allow-Methods", "Origin", "X-Requested-With, Content-Type, Accept, Z-Key");
    res.setHeader("Access-control-Allow-Headrs", "GET, POST, PUT, DELETE, OPTIONS");
    next();
})
app.use(errorHandler.errorHandler);
process.on('unCaughtException', (err, origin )=>{
    console.log(process.stderr.fd,`Caught exception: ${err}\n` + `Exception origin: ${origin}`);
});

app.use(cors(methods=['GET','POST','DELETE','UPDATE','PUT','PATCH']));
app.use(cors({  origin: '*'}));


passport.use(new GitHubStrategy({
    clientID: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
    callbackURL: process.env.GITHUB_CALLBACK_URL
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
))

passport.serializeUser((user, done) =>{
    done(null, user);
})
passport.deserializeUser((user, done)=>{
    done(null, user);
})
app.get('/', (req, res) => {res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.username}` : 'Not logged in');});

app.get('/github/callback', passport.authenticate('github', 
    {failureRedirect: '/api-docs', session: false}),
    (req, res) => {
        req.session.user = req.user;
        res.redirect('/');
    }
)

//DATABASE INITIALIZATION AND SERVER START
mongodb.initDb((err)=>{
    if(err){
        console.log(err)
    }
    else{
        app.listen(port, () => { console.log(`Database is running on port ${port}`);});
    }
});
