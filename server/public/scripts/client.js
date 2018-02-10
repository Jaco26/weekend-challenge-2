$(document).ready(function(){

    getAllNumbers();

    $('#number-in-btn').on('click', function(){
        submitNumber()
    }); // END #number-in-btn onclick

}); // END document.ready

function submitNumber(){
    let number = $('#number-in').val();

} // END submitNumber

function getAllNumbers(){

    $.ajax({
        type: 'GET',
        url: '/calculator'
    }).done(function(data){
        console.log('request was successful!');
        console.log('This is the data:',data);
        // call a function that puts the data on the DOM
        // someFunction(data);
        displayResponse(data)
    }).fail(function(error){
        console.log(error);
    }); // END ajax

} // END getAllNumbers

function submitNumber(){
    let newNumber = $('#number-in').val();

    $.ajax({
        type: 'POST',
        url: '/calculator/add-to',
        data: {number: newNumber}
    }).done(function(response){
        console.log('number successfully added', response);
        getAllNumbers();
    }).fail(function(error){
        console.log(error);
    }); // END ajax

} // END submitNumber


function displayResponse(array){
    $('#output').empty();
    let $ul = $('<ul>');
    for(let number of array){
        $ul.append($('<li>').text(number.number));
    }
    $('#output').append($ul);
}

// in packageCalculatorInput