//ReactDOM is only rendering this component using the #react-root as it's targer. This contains a div elements
//containing all of the smaller components required for a page to run. This also can modify the content
//of these components.

import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from "./MessageList.jsx";

class App extends Component {

  handleSubmit(event) {
    event.preventDefault()
    let input = document.getElementById("text").value
    let user = document.getElementById("user").value;
    let type = ""

    if (user === "") {
      user = "Anonymous";
    }

    let newMessage = {}
    //This is basically what's going to assign the type of the Message. If at any point it finds that a new username is sent, it's going to
    //Send the new notif accordignly.

    if (user !== this.state.currentUser.name) {
      newMessage = {
        type: "PostNotification",
        username: user,
        content: `${this.state.currentUser.name} changed their name to: ${user}`
      }
      let userObj = {
        name: user}
      this.setState({currentUser: userObj});

    } else {
    newMessage = {
      type: "PostMessage",
      username: this.state.currentUser.name,
      content: input,
      color: this.state.color
    }
  }

    let messageString = JSON.stringify(newMessage);
    this.socket.send(messageString)

    document.getElementById('text').value = "";
  }

  //This is used to set the initial state of the component. It's basically setting a basic currentUser as well as a few
  //test messages.
  constructor(props){
    super(props);
    this.state =
    { currentUser: {name: "Anonymous"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [],
      count: 0,
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }


  //When Component mounts, does something
  componentDidMount() {
  console.log("componentDidMount <App />");

  //Link to WebSocket
  this.socket = new WebSocket("ws://localhost:3001");

  //Confirmation
  this.socket.onopen = function(){
    console.log("Connected to WebSocket")
  }

  this.socket.onmessage = (event) => {

    console.log(event.data);
    const newMessage = JSON.parse(event.data);

    switch (newMessage.type) {

      case "IncomingNotification":

        let notif = this.state.messages.concat(newMessage);
        this.setState({messages: notif});
        break;

      case "IncomingMessage":
        let messages = this.state.messages.concat(newMessage);
        this.setState({messages: messages});
        break;

      case "UserCount":
        this.setState({count: newMessage.count})
        this.setState({color: newMessage.color})
    }
  }
}

  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
        <span className="userCount"> Users Online: {this.state.count} </span>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar name={this.state.currentUser.name} handleSubmit={this.handleSubmit}/>
    </div>
    );
  }
}

export default App;
