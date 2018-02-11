
$(document).ready(function(){
    let currentCalculationQueue = []; // store a sequence of values for buttons pressed
    
    $(document).on('keydown', function(e){
        if (e.key.match(/\d/)) {
            currentCalculationQueue.push(e.key);
            $('#current-calculation').append(e.key);
        } else if (e.key.match(/[+-/*]/)) {
            if (currentCalculationQueue[currentCalculationQueue.length - 1].match(/[+-/*]/)){
                return false;   
            } else {
                $('#current-calculation').append(' ' + e.key + ' ');
                currentCalculationQueue.push(' ' + e.key + ' ');
            }
        } else if (e.key === 'Enter') {
            let tester = currentCalculationQueue.filter(x => x.match(/-+\/*/));
            if (currentCalculationQueue[currentCalculationQueue.length - 1].match(/-+\/*/) || tester.length === 0) {
                alert('HEY! You are either ending you expression with a math operator (+ - * /) or you haven\'t included any at all!!!');
                return false;
            } else {
                sendData(currentCalculationQueue); // send the equence of values for buttons pressed server-side for calculation
                currentCalculationQueue = [] // IMPORTANT CLEAR currentCalculationQueue 
                $('#current-calculation').empty();
            }
        } else if (e.key === 'Backspace') {
            currentCalculationQueue.pop();
            $('#current-calculation:last').empty();
            for (let i = 0; i < currentCalculationQueue.length; i++) {
                $('#current-calculation').append(currentCalculationQueue[i]);
            }
        }
    }); // END document onkeydown

    $('.number-btn').on('click', function () {
        currentCalculationQueue.push($(this).attr('id'));
        $('#current-calculation').append($(this).attr('id'));
        console.log(currentCalculationQueue);
    }); // END number-btn onclick

    $('.operation-btn').on('click', function () {
        if (currentCalculationQueue[currentCalculationQueue.length - 1].match(/[+-/*]/)) {
            return false;
        } else {
            $('#current-calculation').append(' ' + $(this).attr('id') + ' ');
            currentCalculationQueue.push(' ' + $(this).attr('id') + ' ');
        }
    }); // END operation-btn onclick

    $('.equals-btn').on('click', function () {
        let tester = currentCalculationQueue.filter(x => x.match(/-+\/*/));
        if (currentCalculationQueue[currentCalculationQueue.length - 1].match(/[-+\/*]/) || tester.length === 0) {
            alert('HEY! You are either ending you expression with a math operator (+ - * /) or you haven\'t included any at all!!!');
            return false;
        } else {
            sendData(currentCalculationQueue); // send the equence of values for buttons pressed server-side for calculation
            currentCalculationQueue = [] // IMPORTANT CLEAR currentCalculationQueue 
            $('#current-calculation').empty();
        }
    }); // END equals-btn onclick

    $('.clear-btn').on('click', function(){
        currentCalculationQueue = []; // CLEAR the currentCalculationQueue;
        $('#current-calculation').empty(); // CLEAR the screen interface
    }); // END clear-btn onclick

    $('.backspace-btn').on('click', function(){
        currentCalculationQueue.pop();
        $('#current-calculation:last').empty();
        for (let i = 0; i < currentCalculationQueue.length; i++) {
            $('#current-calculation').append(currentCalculationQueue[i]);
        }
    }); // END backspace-btn onclick

    $('#clear-history').on('click', function(){
        if(confirm('Are you sure?? ALL previous calculations will be deleted.')){
            clearHistory();
        }
    }); // END clear-history onclick

}); // END document.ready


function sendData(toBeCalculated){
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
    //$('#screen-interface').append($('<p><strong>answer: </strong>'+(arr[arr.length - 1].expression.join(' ') + ' = ' + arr[arr.length - 1].result+'</p>')));
    for(let i = 0; i < arr.length; i++){
        $ul.prepend($('<li>').text(arr[i].expression.join(' ') + ' = ' + arr[i].result));    
    }
} // END displayResults

function clearHistory(){
    $.ajax({
        type: 'DELETE',
        url: '/calculator/delete',
    }).done(function(response){
        console.log(response);
        displayResults(response);
    }).fail(function(error){
        console.log(error);   
    }); // END ajax DELETE        
} // END clearHistory
