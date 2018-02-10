// make all the propteries and methods from the Express library(module) available to use here
const express = require('express');
// store the value returned by the express.Router() method in const router
const router = express.Router();

const numberModule = require('../modules/number-module');


router.get('/', function(req, res){
    let numbers = numberModule.getAllNumbers;
    console.log('The numbersArray in number-module.js is holding:', numbers);

    res.send(numberModule.getAllNumbers());
}); // END router.get

router.post('/add-to', function(req, res){
    let number = req.body.number;
    numberModule.addNumber(number);
    res.sendStatus(200);
}); // END router.post



module.exports = {
    router: router,
}

