// creates express server:
const express = require('express');
// create our app variable, an instance of express library and used to 
// create our backend server
const app = express(); 
// create an instance of http library 
const http = require("http");
// ^^ you dont have to create your server that way. but socket.io is created upon an http server 
// it's the recomnedded way of doing this accoridng to their recoemdnation 
// https://socket.io/get-started/chat
// -----
// getting class called server from socket.io library
const { Server } = require("socket.io");

// shouldn't worry about cors too much since it's not vital...look at timestamp 9:20
// importing the cors library
const cors = require("cors");
// setting our project to accept cors 
app.use(cors());
// creating actual http server with express and passes a
const server = http.createServer(app);

// create io variable that will be used to do anything related to socket io in BE
// say new b/c Server is a class and need to instantiate a new instance of it
const io = new Server(server, {
    // lots of ppl have issues w/ socket io.. cors helps with that problem, we enter all 
    // different properties
    cors: {
        // origin of FE. It's at local host b/c when we run React it always runs in our local host
        origin: "http://localhost:3000",
        // can also write methods we're accepting ex: GET, POST requests
        methods: ["GET", "POST"],
        // after this we created Line 16-18
    },
});
// ------------------------
// ^^have completed setting up our server!

// start of listenining events w/ io
// first event we listen to whenevr we have a socket io server
io.on("connection", (socket) => {
    // socket.id would be each unique user
    console.log(`User connected ${socket.id}`);
    // can use socket variable to listen to custom events like send_message which 
    // will return data(data in our ex). so create a callback func to receieve that data
    socket.on("send_message", (data) => {
        // console.log(data); //this prints out message: "hello Kai" on the terminal

        // emit data to everyone who's connected to everyone that's connected
        // broadcast sends something to everyone but yourself
        // .emit will allow us to emit another event so give it a diff name
        // data is what was sent through the FE
        socket.broadcast.emit("receive_message", data)
    });

});


// setting up to listen to a port, 3001 b/c react would be using 3000. and then we create a server
// which console.logs a messagge
server.listen(3001, () => {
    console.log("SERVER IS RUNNING plllleaasseee i hope so");

});