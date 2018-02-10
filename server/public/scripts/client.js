$(document).ready(function(){
   // getCalculations(); // load previous calculations stored on server when page loads
    let currentCalculationQueue = []; // store a sequence of values for buttons pressed
    $('.number-btn').on('click', function () {
        currentCalculationQueue.push($(this).attr('id'));
        $('#screen-interface').append($(this).attr('id'));
        console.log(currentCalculationQueue);
        
    }); // END number-btn onclick
    $('.operation-btn').on('click', function () {
        currentCalculationQueue.push($(this).attr('id'));
        $('#screen-interface').append(' ' + $(this).attr('id') + ' ');
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
    let hasOperators = toBeCalculated.filter(function(x){
        if(x === '+' || x === '-' || x === '*' || x === '/'){
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
            currentCalculationQueue = [];
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
    let $ol = $('#previous-calculations');
    $ol.empty();
    for(let i = 0; i < arr.length; i++){
        $ol.prepend($('<li>').text(arr[i].expression.join(' ') + ' = ' + arr[i].result));    
    }
}


