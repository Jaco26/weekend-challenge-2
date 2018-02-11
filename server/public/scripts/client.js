
$(document).ready(function(){
    let currentCalculationQueue = []; // store a sequence of values for buttons pressed
    
    $(document).on('keydown', function(e){
        if (e.key.match(/\d/)) {
            currentCalculationQueue.push(e.key);
            $('#screen-interface').append(e.key);
        } else if (e.key.match(/[+-/*]/)) {
            if (currentCalculationQueue[currentCalculationQueue.length - 1].match(/[+-/*]/)){
                return false;   
            } else {
                $('#screen-interface').append(' ' + e.key + ' ');
                currentCalculationQueue.push(' ' + e.key + ' ');
            }
        } else if (e.key === 'Enter') {
            if (currentCalculationQueue[currentCalculationQueue.length - 1].match(/-+\/*/)) {
                return false;
            } else {
                sendData(currentCalculationQueue); // send the equence of values for buttons pressed server-side for calculation
                currentCalculationQueue = [] // IMPORTANT CLEAR currentCalculationQueue 
                $('#screen-interface').empty();
            }
        } else if (e.key === 'Backspace') {
            currentCalculationQueue.pop();
            $('#screen-interface:last').empty();
            for (let i = 0; i < currentCalculationQueue.length; i++) {
                $('#screen-interface').append(currentCalculationQueue[i]);
            }
        }
    }); // END document onkeydown

    $('.number-btn').on('click', function () {
        currentCalculationQueue.push($(this).attr('id'));
        $('#screen-interface').append($(this).attr('id'));
        console.log(currentCalculationQueue);
    }); // END number-btn onclick

    $('.operation-btn').on('click', function () {
        if (currentCalculationQueue[currentCalculationQueue.length - 1].match(/[+-/*]/)) {
            return false;
        } else {
            $('#screen-interface').append(' ' + $(this).attr('id') + ' ');
            currentCalculationQueue.push(' ' + $(this).attr('id') + ' ');
        }
    }); // END operation-btn onclick

    $('.equals-btn').on('click', function () {
        if (currentCalculationQueue[currentCalculationQueue.length - 1].match(/[-+\/*]/)) {
            return false;
        } else {
            sendData(currentCalculationQueue); // send the equence of values for buttons pressed server-side for calculation
            currentCalculationQueue = [] // IMPORTANT CLEAR currentCalculationQueue 
            $('#screen-interface').empty();
        }
    }); // END equals-btn onclick

    $('.clear-btn').on('click', function(){
        currentCalculationQueue = []; // CLEAR the currentCalculationQueue;
        $('#screen-interface').empty(); // CLEAR the screen interface
    }); // END clear-btn onclick

    $('.backspace-btn').on('click', function(){
        currentCalculationQueue.pop();
        $('#screen-interface:last').empty();
        for (let i = 0; i < currentCalculationQueue.length; i++) {
            $('#screen-interface').append(currentCalculationQueue[i]);
        }
    }); // END backspace-btn onclick

}); // END document.ready


function sendData(toBeCalculated){
    
    let hasOperators = toBeCalculated.filter(function(x){
        if(x === ' + ' || x === ' - ' || x === ' * ' || x === ' / '){
            return x;
        }
    });
    if (hasOperators.length === 0){
        alert('Did you hit  "+"  "-"  "*"  or  "/"  yet?');
        //return false;
    } else {
        // POST...but for now just log something
        $.ajax({
            type: 'POST',
            url: '/calculator/add-to',
            data: { calculationQueue: toBeCalculated }
        }).done(function (response) {
            toBeCalculated = []; // clear the calculationQueue array
            getCalculations();
            // then...clear currentCalculationQueue
            toBeCalculated = [];
        }).fail(function (error) {
            console.log(error);
        }); // END ajax POST
    }
}; // END equals-btn onclick


function getCalculations(){
    $.ajax({
        type: 'GET',
        url: '/calculator'
    }).done(function(response){
        console.log('Request was successful!');
        console.log(response);
        displayResults(response); // display response on the DOM
    }).fail(function(error){
        console.log(error); 
    }); // END ajax GET

}; // END getCalculations


// this function will accept an array of previous calculations/results in their own objects objects and display their contents in the unordered list #previous-calculations (the most recent one will be in the #screen-interface)
function displayResults(arr){
    let $ul = $('#previous-calculations');
    $ul.empty();
    $('#screen-interface').append($('<p><strong>answer: </strong>'+(arr[arr.length - 1].expression.join(' ') + ' = ' + arr[arr.length - 1].result+'</p>')));
    for(let i = 0; i < arr.length; i++){
        $ul.prepend($('<li>').text(arr[i].expression.join(' ') + ' = ' + arr[i].result));    
    }
}


