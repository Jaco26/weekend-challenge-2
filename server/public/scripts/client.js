$(document).ready(function(){
    const currentCalculationQueue = []; // store a sequence of values for buttons pressed
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
        $('#screen-interface').empty();
    }); // END equals-btn onclick

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





/*

$(document).ready(function () {
    sendCalculationRequirements()

   
    getAllNumbers();
    $('#number-in-btn').on('click', function(){
        submitNumber()
    }); // END #number-in-btn onclick
   

}); // END document.ready


// get numbers and type of operation to be performed on them from DOM
function sendCalculationRequirements() {
    let toBeCalculated = {
        calculationOrder: [],
    }

    $('.number-btn').on('click', function () {
        toBeCalculated.calculationOrder.push($(this).attr('id'));
    });

    $('.op-btn').on('click', function () {
        toBeCalculated.calculationOrder.push($(this).attr('id'));
    });

    $('.equals-btn').on('click', function () {
        // POST...but for now just log something
        $.ajax({
            type: 'POST',
            url: '/calculator/add-to',
            data: toBeCalculated
        }).done(function (response) {
            // run function to get finished calculation back
            // this function should display the most recent calculation on the screen-interface
            getCalculations();
            // then...clear toBeCalculated.calculationOrder
            toBeCalculated.calculationOrder = [];
        }).fail(function (error) {
            console.log(error);
        }); // END ajax POST


    }); // END equals-btn onclick

} // END sendCalculationRequirements


function getCalculations() {
    $.ajax({
        type: 'GET',
        url: '/calculator'
    }).done(function (response) {
        console.log('Request was successful!');
        console.log(response);
        // call some function that puts the response on the DOM

    }).fail(function (error) {
        console.log(error);
    }); // END ajax GET

}; // END getCalculations

*/