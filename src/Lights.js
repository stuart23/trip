import React, { Component } from 'react';
import Light from './Light';

export default class Lights extends Component {
  render() {
    const lights = this.props.lights.map(light =>
      <Light
        name={light.name}
        id={light.id}
        activateLight={this.props.activateLight}
        deactivateLight={this.props.deactivateLight}
      />
    );
    return(lights);
  }
}
