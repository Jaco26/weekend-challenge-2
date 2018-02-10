// get functionality from format-array-for-math
const expressionModule = require('../modules/format-array-for-math');


// store a history of all the calculations made. Each element in this array should be an object
const calculationsHistory = []; 

// add to calculationsHistory
function addCalculation(){
    //console.log('in calculations-history line 10: ', expressionModule.getFinalExpression());
    calculationsHistory.push({calculation: expressionModule.getFinalExpression()});
   // console.log('in calculations-history line 13: ',expressionModule.getFinalExpression());
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