// make all the propteries and methods from the Express library(module) available to use here
const express = require('express');
// store the value returned by the express.Router() method in const router
const router = express.Router();

const expressionModule = require('../modules/format-array-for-math');
const calculationsModule = require('../modules/calculations-history');


router.get('/', function(req, res){
    calculationsModule.addCalculation();
    res.send(calculationsModule.getAllCalculations());
}); // END router.get

router.post('/add-to', function(req, res){
    let array = req.body.calculationQueue;
    expressionModule.formatForMath(array);
    res.sendStatus(200);
}); // END router.post

router.delete('/delete', function(req, res){
    calculationsModule.clearHistory()
    res.send(calculationsModule.getAllCalculations());
});

module.exports = {
    router: router,
}

// in calcLogic
