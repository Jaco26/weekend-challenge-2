const Number = require('./number-class');

const numbersArray = [
    new Number(8),
    new Number(40),
];

function addNumber(number){
    numbersArray.push(new Number(number));
}

function getAllNumbers(){
    return numbersArray;
}

module.exports = {
    addNumber: addNumber,
    getAllNumbers: getAllNumbers
}