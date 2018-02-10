$(document).ready(function(){
    sendCalculationRequirements()
    
    /*
    getAllNumbers();
    $('#number-in-btn').on('click', function(){
        submitNumber()
    }); // END #number-in-btn onclick
    */
   
}); // END document.ready


// get numbers and type of operation to be performed on them from DOM
function sendCalculationRequirements(){
    let toBeCalculated = {
        calculationOrder: [],
    }

    $('.number-btn').on('click', function(){
        toBeCalculated.calculationOrder.push($(this).attr('id'));
    });

    $('.op-btn').on('click', function(){
        toBeCalculated.calculationOrder.push($(this).attr('id'));
    });

    $('.equals-btn').on('click', function(){
        // POST...but for now just log something

        $.ajax({
            type: 'POST',
            url: '/calculator/add-to',
            data: toBeCalculated
        }).done(function(response){
            // run function to get finished calculation back
        }).fail(function(error){
            console.log(error);
        }); // END ajax POST

        console.log(toBeCalculated);
        $('#screen-interface').empty();
        for (let item of toBeCalculated.calculationOrder){
            $('#screen-interface').append(item)
        }
       
        
        // After a successful post, clear toBeCalculated.calculationOrder
        toBeCalculated.calculationOrder = [];
    })
}



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