$(document).ready(function(){
    let currentCalculationQueue = []; // store a sequence of values for buttons pressed
    $('.number-btn').on('click', function () {
        currentCalculationQueue.push($(this).attr('id'));
        $('#screen-interface').append($(this).attr('id'));
    }); // END number-btn onclick
    $('.operation-btn').on('click', function () {
        currentCalculationQueue.push($(this).attr('id'));
        $('#screen-interface').append(' ' + $(this).text() + ' ');
    }); // END operation-btn onclick
    $('.equals-btn').on('click', function () {
        sendData(currentCalculationQueue); // send the equence of values for buttons pressed server-side for calculation
        currentCalculationQueue = [] // IMPORTANT CLEAR currentCalculationQueue 
        $('#screen-interface').empty();
    }); // END equals-btn onclick
    $('.clear-btn').on('click', function(){
        currentCalculationQueue = []; // CLEAR the currentCalculationQueue;
        $('#screen-interface').empty(); // CLEAR the screen interface
    }); // END clear-btn onclick

}); // END document.ready


function sendData(toBeCalculated){
    // POST...but for now just log something
    $.ajax({
        type: 'POST',
        url: '/calculator/add-to',
        data: {calculationQueue : toBeCalculated}
    }).done(function (response) {
        // run function to get finished calculation back
        // this function should display the most recent calculation on the screen-interface
        toBeCalculated = []; // clear the f***ing array dude
        getCalculations();
        // then...clear currentCalculationQueue
        currentCalculationQueue = [];
    }).fail(function (error) {
        console.log(error);
    }); // END ajax POST


}; // END equals-btn onclick


function getCalculations(){
    $.ajax({
        type: 'GET',
        url: '/calculator'
    }).done(function(response){
        console.log('Request was successful!');
        console.log(response);
        // call some function that puts the response on the DOM

    }).fail(function(error){
        console.log(error); 
    }); // END ajax GET

}; // END getCalculations

// start working on displaying the results


