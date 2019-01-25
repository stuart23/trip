import React, { Component } from 'react';
import Lights from './Lights';

export default class Group extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const lights = <Lights
      lights={this.props.lights}
      activateLight={this.props.activateLight}
      deactivateLight={this.props.deactivateLight}
    />;
    return(
      <div>
      {this.props.name}
      {lights}
      </div>
    )
  }  
}    
