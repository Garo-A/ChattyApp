import React, {Component} from 'react';
import Message from "./Message.jsx";


class MessageList extends Component {
  render() {
    return (
      <main className="messages">
      {this.props.messages.map((message) =>
        { if (message.type === "IncomingMessage") {
          //CHECK IF CONTENT HAS PNG, JPG, OR GIF WITHIN URL. IF YES THEN RENDER IMG. IF NOT THEN RENDER NORMAL
          if ((message.content.includes(".jpg")) || (message.content.includes(".gif")) || (message.content.includes(".png"))) {
            return (
            <div className="message">
              <span className="message-username" style={{color: message.color}}>{message.username}</span>
              <img className= "image" src={message.content}/>
            </div>)
          } else {
            return <Message key={message.id} user={message.username} content={message.content} color={message.color}/> }
        } else if (message.type === "IncomingNotification"){
            return <div key={message.id} className="message system">{message.content}</div>
         }
        }
      )}
      </main>
    )
  }
}
export default MessageList;