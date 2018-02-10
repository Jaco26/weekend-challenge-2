// get functionality from format-array-for-math
const expressionModule = require('../modules/format-array-for-math');


// store a history of all the calculations made. Each element in this array should be an object
const calculationsHistory = []; 

// add to calculationsHistory
function addCalculation(){
    calculationsHistory.push({expression: expressionModule.getFinalExpression(), result: expressionModule.getResult()});
    expressionModule.clearFinalExpression();
}

// get all calculationsHistory contents
function getAllCalculations(){
    return calculationsHistory;
}

// export functionality 
module.exports = {
    addCalculation: addCalculation,
    getAllCalculations: getAllCalculations,
}