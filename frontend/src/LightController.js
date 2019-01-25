import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import './LightController.css';

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
        <Button variant="contained" color="111111" onClick={this.switchOn}>
          Switch On
        </Button>
        <Button variant="contained" className="DarkButton" onClick={this.switchOff}>
          Switch Off
        </Button>
      </div>
    )
  }  
}
