// const NumberClass = require('/number-class');

let finalExpression = [];

// Write a function that accepts an array of strings
//  - it should sum all adjacent strings that would match /\d/g
//  - when it comes across an operation command (plus, minus, multiply, divide) it should carry out the proper math operation on the two integers that sandwich it
//  - it should return an object that holds a string of the final expression it evaluated AND the value it evaluated to
function formatForMath(arr){
    //let operations = ['plus', 'minus', 'multiply', 'divide'];
    let numString = '';
    for(let i = 0; i < arr.length; i++){
        if (arr[i] === 'plus' || arr[i] === 'minus' || arr[i] === 'multiply' || arr[i] === 'divide'){
            finalExpression.push(Number(numString));
            finalExpression.push(arr[i]);
            numString = '';
        } else {
            numString += arr[i];
            if (i === arr.length - 1){
                finalExpression.push(Number(numString));
            }
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