import React, {Component} from 'react';

class Image extends Component {
  render() {
    return (
      <div>
        <span className="message-username" style={{color: this.props.color}}>{this.props.user}</span>
        <img className= "image" src={this.props.content}/>
      </div>
      )
  }
}

export default Image;
