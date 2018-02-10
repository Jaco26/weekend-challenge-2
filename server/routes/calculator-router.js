// make all the propteries and methods from the Express library(module) available to use here
const express = require('express');
// store the value returned by the express.Router() method in const router
const router = express.Router();

const formatForMath = require('../modules/format-array-for-math');

router.get('/', function(req, res){
    let expressionArray = formatForMath.getFinalExpression;
    res.send(formatForMath.getFinalExpression());

}); // END router.get


router.post('/add-to', function(req, res){
    let array = req.body.calculationQueue;
    console.log('In calculator-router, logging "array" from line 16:',array);
    
    formatForMath.formatForMath(array);
    res.send(200);

}); // END router.post



module.exports = {
    router: router,
}

// in calcLogic
