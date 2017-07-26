import React, {Component} from 'react';
import Message from "./Message.jsx";


class MessageList extends Component {
  render() {
    return (
      <main className="messages">
      {this.props.messages.map((message, index) =>
        { if (message.type === "IncomingMessage") {
        return <Message key={index} user={message.username} content={message.content}/>
          } else if (message.type === "IncomingNotification"){
            return <div className="message system">{message.content}</div>
         }
        }
      )}
      </main>
    )
  }
}
export default MessageList;