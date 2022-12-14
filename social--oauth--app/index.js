const express = require('express');
const mongoose = require('mongoose');
const auth = require('./routes/auth');
// this is quite amazing
const passportConfig = require('./passport/passport');
const passport = require('passport');

const app = express();
const PORT = 4000;

// setting view engine
app.set('view engine', 'ejs');

// This was required not sure why??
// const session = require('express-session');
// app.use(session({ secret: 'SECRET' })); // session secret

// Hitesh, told me to use cookie-session
const cookieSession = require('cookie-session');
app.use(cookieSession({
    maxAge: 3 * 24 * 60 * 60 * 1000,
    keys: ['ThisIsMySecret']
}));

// why these lines
app.use(passport.initialize());
app.use(passport.session());


app.use('/auth', auth)


// connecting to the DB
mongoose.connect('mongodb://localhost:27017/passport', {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log(`DB Connected Successfully`));

const isLoggedIn = (req, res, next) => {
    if (!req.user) {
        res.redirect('/auth/login');
    }
    next();
}

app.get('/', isLoggedIn, (req, res) => {
    res.render('home')
}); 

app.listen(PORT, () => console.log('Listening on PORT 4000...'));

// TODO: Articles
// https://medium.com/@prashantramnyc/how-to-implement-google-authentication-in-node-js-using-passport-js-9873f244b55e
// https://www.passportjs.org/concepts/authentication/downloads/html/
// https://www.npmjs.com/package/cookie-session