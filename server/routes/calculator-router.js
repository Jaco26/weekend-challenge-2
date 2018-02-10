// make all the propteries and methods from the Express library(module) available to use here
const express = require('express');
// store the value returned by the express.Router() method in const router
const router = express.Router();

const expressionModule = require('../modules/format-array-for-math');
const calculationsModule = require('../modules/calculations-history');


router.get('/', function(req, res){
    calculationsModule.addCalculation();
    expressionModule.clearFinalExpression();
    res.send(calculationsModule.getAllCalculations());
    console.log(expressionModule.getFinalExpression());
    
}); // END router.get


router.post('/add-to', function(req, res){
    let array = req.body.calculationQueue;
    console.log('In calculator-router, logging "array" from line 16:',array);
    expressionModule.formatForMath(array);
    array = []; // clear it here too dude
    res.sendStatus(200);

}); // END router.post



module.exports = {
    router: router,
}

// in calcLogic
