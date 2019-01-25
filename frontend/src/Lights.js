import React, { Component } from 'react';
import Light from './Light';

export default class Lights extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const lights = this.props.lights.map(light =>
      <Light name={light.name} />
    );
    return(lights);
  } 
}    

