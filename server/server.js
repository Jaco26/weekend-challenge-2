const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 5001;

app.use(bodyParser.urlencoded( { extended: true } ));
app.use(express.static('server/public'));

app.listen()(port, function(){
    console.log('listening on port', port); 
});
