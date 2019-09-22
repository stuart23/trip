import React, { Component } from 'react';
import LightController from './LightController';
import GyroController from './GyroController';

export default class Controller extends Component {
  constructor(props) {
    super(props);
    this.control = this.control.bind(this);
  }

  control(command) {
    for (var light in this.props.active_lights) {
      fetch("https://" + this.props.bridge_ip + "/api/"
            + this.props.username + "/lights/"
            + this.props.active_lights[light]
            + "/state", {
            body: JSON.stringify(command),
            method: "PUT"
          }
      );
    }
  }

  render() {
    return(
      <div>
        <LightController control={this.control} />
        <GyroController useGravity={true} control={this.control}/>
      </div>
    )
  }
}
