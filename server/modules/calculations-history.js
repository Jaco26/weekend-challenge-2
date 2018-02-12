// get functionality from format-array-for-math
const expressionModule = require('../modules/format-array-for-math');


// store a history of all the calculations made. Each element in this array should be an object
let calculationsHistory = []; 

let particularCalculation = {expression: ''};

// add to calculationsHistory
function addCalculation(){
    let array = expressionModule.getFinalExpression();
    calculationsHistory.push({expression: expressionModule.getFinalExpression(), result: expressionModule.getResult(array)});
    expressionModule.clearFinalExpression();
}

// get particular calculation 
function specifyCalculation(x){
    particularCalculation = {expression: ''};
    for (let i = 0; i < calculationsHistory[x].expression.length; i++){
        particularCalculation.expression += calculationsHistory[x].expression[i];
    }
}

function getSpecificCalculation(){
    return particularCalculation;
}

// get all calculationsHistory contents
function getAllCalculations(){
    return calculationsHistory;
}

function clearHistory(){
    calculationsHistory = [];
    return calculationsHistory;
}

// export functionality 
module.exports = {
    addCalculation: addCalculation,
    specifyCalculation: specifyCalculation,
    getSpecificCalculation: getSpecificCalculation,
    getAllCalculations: getAllCalculations,
    clearHistory: clearHistory,
}