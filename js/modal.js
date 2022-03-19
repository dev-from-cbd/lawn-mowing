$(document).ready(function() {
    $('.modal').modal({
            dismissible: true, // Modal can be dismissed by clicking outside of the modal
            opacity: .5, // Opacity of modal background
            inDuration: 300, // Transition in duration
            outDuration: 200, // Transition out duration
            startingTop: '4%', // Starting top style attribute
            endingTop: '10%', // Ending top style attribute
        }
    );

    $( 'a.pay-link').click(function() {
        $('#quote').modal('hide');
    });
    $( 'a.quote-link').click(function() {
        $('#pay').modal('hide');
        alert("Hi");
    });
});