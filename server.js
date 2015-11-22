// Require modules
var app = require('express')();
var express = require('express');
var http = require('http').Server(app);
var io = require('socket.io')(http);
var SerialPort = require("serialport").SerialPort;

// Open a serial port
var serialReady = false;

var serial = new SerialPort("/dev/cu.usbmodem1411", {
    baudrate: 9600
});

serial.on("open", function() {
    serialReady = true;
});

var server_port = 8080;
//var server_ip_address = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

// Build server
app.use(express.static('public'));

// Setup variables
var buttonOn = "1";

// Set up connection function
io.on('connection', function(socket){
	// Log connection
	console.log('User connected: ' + socket.id);

    // Send client current state
    socket.emit("update", buttonOn);

    // Set up click handler
    socket.on("click", function(buttonState) {
        // Flip the button
        if (buttonOn == "1")
            buttonOn = "0";
        else
            buttonOn = "1";

        console.log("Lights are " + buttonOn);

        if (serialReady)
            serial.write(buttonOn);

        io.emit("update", buttonOn);
    });

	// Set up disconnection function
	socket.on('disconnect', function(socket){
		// Log disconnection
		console.log('User disconnected: ' + socket.id);
	});
});


// Start server
http.listen(server_port, /*server_ip_address,*/ function(){
	console.log( "Listening on " /*+ server_ip_address*/ + ", port " + server_port );
});
