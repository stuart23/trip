import React, { Component } from 'react';

export default class Light extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.toggleLight = this.toggleLight.bind(this);
  }

  toggleLight() {
    if (this.state.selected) {
      this.props.deactivateLight(this.props.id);
      this.setState({selected: false});
    } else {
      this.props.activateLight(this.props.id);
      this.setState({selected: true});
    }
  }

  render() {
    return(
      <div onClick={this.toggleLight}>
      {this.props.name}
      </div>
    )
  }  
}    
