import React, {Component} from 'react';

class ChatBox extends Component {

  render() {
    return (
      <footer className='chatbar'>
        <form onSubmit={this.props.handleSubmit}>
          <input className="chatbar-username" id="user" placeholder="Your Name (Optional)" type="text"/>
          <input className="chatbar-message" id="text" placeholder="Type a message and hit ENTER" type="text"/>
          <input type="submit" className="submit-btn" />
        </form>

      </footer>
    );
  }
}
export default ChatBox;
