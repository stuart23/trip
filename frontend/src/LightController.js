import React, { Component } from 'react';

export default class LightController extends Component {
  constructor(props) {
    super(props);
    this.switchOn = this.switchOn.bind(this);
    this.switchOff = this.switchOff.bind(this);
  }

  switchOn() {
    for (var light in this.props.active_lights) {
      fetch("http://" + this.props.bridge_ip + "/api/"
            + this.props.username + "/lights/"
            + this.props.active_lights[light]
            + "/state", {
            body: JSON.stringify({"on": true}),
            method: "PUT"
          }
      );
    }
  }

  switchOff() {
    for (var light in this.props.active_lights) {
      fetch("http://" + this.props.bridge_ip + "/api/"
            + this.props.username + "/lights/"
            + this.props.active_lights[light]
            + "/state", {
            body: JSON.stringify({"on": false}),
            method: "PUT"
          }
      );
    }
  }

  render() {
    return(
      <div>
        <div onClick={this.switchOn}>
          Switch On
        </div>
        <div onClick={this.switchOff}>
          Switch Off
        </div>
      </div>
    )
  }  
}
