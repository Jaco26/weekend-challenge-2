const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5001;

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(express.static('server/public'));

// store the value returned by the express.Router() method from calculator-router.js
const calculatorRouter = require('./routes/calculator-router');
app.use('/calculator', calculatorRouter.router);

app.listen(port, function(){
    console.log('listening on port', port);
    
});
