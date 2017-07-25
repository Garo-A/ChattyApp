import React, {Component} from 'react';

class ChatBox extends Component {

  render() {
    return (
      <footer className='chatbar'>
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.name}/>

        <form onSubmit={this.props.handleSubmit}>
          <input className="chatbar-message" id="text" placeholder="Type a message and hit ENTER" type="text"/>
        </form>

      </footer>
    );
  }
}
export default ChatBox;
