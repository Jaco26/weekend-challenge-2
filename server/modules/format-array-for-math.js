// const NumberClass = require('/number-class');

let finalExpression = [];

// Write a function that accepts an array of strings
//  - it should sum all adjacent strings that would match /\d/g
//  - when it comes across an operation command (plus, minus, multiply, divide) it should carry out the proper math operation on the two integers that sandwich it
//  - it should return an object that holds a string of the final expression it evaluated AND the value it evaluated to
function formatForMath(arr){
    let operationObj = [];
    for(let i = 0; i < arr.length; i++){
        if(arr[i].match(/\d/g)){
            finalExpression.push(Number(arr[i]));
        } else {
            finalExpression.push({'operation':arr[i]});
        }
    }
} // END formatForMath


function getFinalExpression(){
    return finalExpression;
}

module.exports = {
    formatForMath: formatForMath,
    getFinalExpression: getFinalExpression
};