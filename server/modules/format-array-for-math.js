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

function clearFinalExpression(){
    finalExpression = [];
}

function getResult(){
    return 'working on it...'
}

module.exports = {
    formatForMath: formatForMath,
    getFinalExpression: getFinalExpression,
    getResult: getResult,
    clearFinalExpression: clearFinalExpression
};