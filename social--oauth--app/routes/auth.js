const router = require('express').Router();
// What is passport??
// What is passport??
// What is passport??
// it is just a middleware
const passport = require('passport');

router.get('/login', (req, res) => {
    res.render('login');
});

router.get('/logout', (req, res) => {
    req.logout();
    res.redirect('/auth/login');
});

router.get(
'/google',
 // inorder to show the consent screen we have to inject middleware
 passport.authenticate('google', {scope: ['profile', 'email']},
 (req, res) => {
    res.send('In google authentication');
 }
));

router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    // wonder in earlier sections req.user was filled by us by the jwt token
    // passportjs fills the req.user internally
    // return res.status(200).json({
    //     message: 'In callback'
    // });
    
    // gives me all the appropriate information
    // res.send(req.user);
    res.redirect('/');
});

// saved me for sure
// https://bobbyhadz.com/blog/javascript-error-cannot-set-headers-after-they-are-sent-to-client

module.exports = router;