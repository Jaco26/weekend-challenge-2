const Number = require('./number-class');

const numbersArray = [
    new Number(8),
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