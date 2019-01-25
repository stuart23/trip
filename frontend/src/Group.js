import React, { Component } from 'react';
import Lights from './Lights';

export default class Group extends Component {
  constructor(props) {
    console.log(props);
    super(props);
  }

  render() {
    const lights = <Lights lights={this.props.lights} />;
    return(
      <p>
      {this.props.name}
      {lights}
      </p>
    )
  }  
}    
