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
    let newMessage = {
      username: "Bob",
      content: input
    }
    const messages = this.state.messages.concat(newMessage)
    this.setState({messages: messages})

    document.getElementById('text').value = "";
  }



  //This is used to set the initial state of the component. It's basically setting a basic currentUser as well as a few
  //test messages.
  constructor(props){
    super(props)
    this.state =
    { currentUser: {name: "Bob"}, // optional. if currentUser is not defined, it means the user is Anonymous
      messages: [
        {
          username: "Bob",
          content: "Has anyone seen my marbles?",
        },
        {
          username: "Anonymous",
          content: "No, I think you lost them. You lost your marbles Bob. You lost them for good."
        }
      ]
    }

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //When Component mounts, does something
  componentDidMount() {
  console.log("componentDidMount <App />");
  setTimeout(() => {
    console.log("Simulating incoming message");
    // Add a new message to the list of messages in the data store
    const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
    const messages = this.state.messages.concat(newMessage)
    // Update the state of the app component.
    // Calling setState will trigger a call to render() in App and all child components.
    this.setState({messages: messages})
  }, 3000);
}

  render() {
    return (
    <div>
      <nav className="navbar">
        <a href="/" className="navbar-brand">Chatty</a>
      </nav>
      <MessageList messages={this.state.messages}/>
      <ChatBar name={this.state.currentUser.name} handleSubmit={this.handleSubmit}/>
    </div>
    );
  }
}

export default App;
