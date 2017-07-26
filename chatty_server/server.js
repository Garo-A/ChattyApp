// server.js

const express = require('express');
const SocketServer = require('ws').Server;
const uuidv4 = require('uuid/v4');

// Set the port to 3001
const PORT = 3001;

//Set Colour Array globally:
const colors = ["red", "blue", "green", "purple"];

//Function that generates a random number from 0 to 3
function colorPicker(arr) {
  let index = Math.round(Math.random()*3)
  return (arr[index]);
}

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.broadcast = function (data) {
  wss.clients.forEach(function (client) {
    client.send(data);
  });
};

wss.on('connection', (ws) => {
  console.log('Client connected');

  let user = {
    type: "UserCount",
    count: wss.clients.size,
    color: colorPicker(colors)
  }

  wss.broadcast(JSON.stringify(user));

  ws.on('message', function (message){
    //Receiving string object from the client, parsing into object and taking out w;hat is needed.
    let messageObj = JSON.parse(message);
    messageObj.id = uuidv4();
    console.log(`ID: ${messageObj.id}, USERNAME: ${messageObj.username}, CONTENT: ${messageObj .content}, TYPE: ${messageObj.type}`)

    //Checking type:
    switch(messageObj.type) {

      case "PostNotification":
        messageObj.type = "IncomingNotification";
        break;

      case "PostMessage":
        messageObj.type = "IncomingMessage";
        break;
    }
    //Converting back to string to send.
    let messageStr = JSON.stringify(messageObj);
    console.log(messageStr);
    wss.broadcast(messageStr);
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => {
    console.log('Client disconnected')

    let userCount = {
      type: "UserCount",
      count: wss.clients.size
    }

    wss.broadcast(JSON.stringify(userCount))
  });
});