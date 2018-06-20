// module imports
var express         = require('express'),
    path            = require('path'),
    cookieParser    = require('cookie-parser'),
    bodyParser      = require('body-parser'),
    session         = require('express-session'),
    passport        = require('passport'),
//Deprecated - used in controllers/helpers.
    // mongoose        = require('mongoose'),
    // MongoStore      = require('connect-mongo')(session);
    app             = express();

//Initialize session
// app.use(require('./helpers/sessions'));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
})

app.use(passport.initialize());
// PRODUCTION ONLY
app.use(express.static(path.join(__dirname, 'client/build')));

// app middleware
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())

//Link to ./controllers/index.js
app.use('/api', require('./controllers'))

//Errors
app.use( (req, res, next) => {
    console.error('Error 404: ', req.originalUrl);
    let msg = {
        status: 'error',
        message: 'Error 404 - Resource was not found'
    };
    res.type('json')
    res.status(404).json(msg);
})

// PRODUCTION ONLY
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});



// Development mode port
const port = process.env.PORT || 5000;
app.listen(port , () => {
    console.log('Server is live on port ' + port + '\nCtrl+C to stop.');
})

module.exports = app;
