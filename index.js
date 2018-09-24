require('./config/config')

const express    = require('express')
const path       = require('path')
const bodyParser = require('body-parser')
const mongoose   = require('mongoose')
const passport = require('passport');
const session = require("express-session")
let app          = express()

//Config de bodyParser
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(session({secret: 'cats'}));
app.use(passport.initialize());
app.use(passport.session());


app.use(require('./routes/index'))

app.use(express.static(path.resolve(__dirname, './public')))

// set the view engine to ejs
app.set('views', path.join(__dirname, './public/views'));
app.set('view engine', 'ejs');


passport.deserializeUser(function(user, done) {
    done(null, user);
});

app.get('/login', (req,res)=>{
    res.sendFile(path.join(__dirname, './public', 'login.html'));
})

mongoose.connect(process.env.URLDB, (err, res) =>{
    if(err) throw err;
    console.log('ROCANROLDB')
});

app.listen(process.env.PORT, () => {
    console.log("ROCANROL")
})