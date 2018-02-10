// Store number values and math-operation strings
let finalExpression = [];

// This function iterate through an array of strings passed in as an argument
//  - it concatinates adjacent strings that can evaluate to a Number() on numString
//  - when the loop comes to the end of the array, it pushes the so-far concatinated numString to the finalExpression array
//  - when it comes across a "math-operation" string, it...
//    - converts to a number the so-far concatinated numString and pushes it to the finalExpression array
//    - then, it pushes the "math-operation" string to the finalExpression array
//    - then, it sets the numString to an empty string so that it can fill up again in a meaningful way
function formatForMath(arr){
    let numString = '';
    for(let i = 0; i < arr.length; i++){
        if (arr[i] === '+' || arr[i] === '-' || arr[i] === '*' || arr[i] === '/'){
            finalExpression.push(parseFloat(numString));
            finalExpression.push(arr[i]);
            numString = '';
        } else {
            numString += arr[i];
            if (i === arr.length - 1){
                finalExpression.push(parseFloat(numString));
            }
        }
    }
} // END formatForMath


function getFinalExpression(){
    return finalExpression;
}

function clearFinalExpression(){
    finalExpression = [];
}

function getResult(arr){
    let evalVar = 0;
    for(let i = 0; i < arr.length; i++){
        if (arr[i] === '+' && evalVar === 0){
            evalVar += (arr[i - 1] + arr[i + 1]);
        } else if (arr[i] === '-' && evalVar === 0){
            evalVar += (arr[i - 1] - arr[i + 1]);
        } else if (arr[i] === '*' && evalVar === 0) {
            evalVar += (arr[i - 1] * arr[i + 1]);
        } else if (arr[i] === '/' && evalVar === 0) {
            evalVar += (arr[i - 1] / arr[i + 1]);
        } else if (arr[i] === '+' && evalVar !== 0) {
            evalVar += arr[i + 1];
        } else if (arr[i] === '-' && evalVar !== 0) {
            evalVar -= arr[i + 1];
        } else if (arr[i] === '*' && evalVar !== 0) {
            evalVar *= arr[i + 1];
        } else if (arr[i] === '/' && evalVar !== 0) {
            evalVar /= arr[i + 1];
        } 
    }
    return evalVar;
}

module.exports = {
    formatForMath: formatForMath,
    getFinalExpression: getFinalExpression,
    getResult: getResult,
    clearFinalExpression: clearFinalExpression
};