// Setup socket
var socket = io();

// Button state
var buttonOn = false;

// Button click function
$(document).ready(function() {
    $('div').click(function() {
        socket.emit("click", true);
    });
});


// Function to recieve button state
socket.on("update", function(buttonState) {
    buttonOn = buttonState;

    if (buttonOn == '1')
        $('#button').css("backgroundColor", "green");
    else
        $('#button').css("backgroundColor",  "red");
});
