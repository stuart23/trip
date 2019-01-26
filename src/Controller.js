import React, { Component } from 'react';
import LightController from './LightController';

export default class Controller extends Component {
  constructor(props) {
    super(props);
    this.control = this.control.bind(this);
  }

  control(command) {
    for (var light in this.props.active_lights) {
      fetch("http://" + this.props.bridge_ip + "/api/"
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
    const {classes} = this.props;
    return(
      <div>
        <LightController control={this.control} />
      </div>
    )
  }  
}

