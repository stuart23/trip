import React, { Component } from 'react';
import Authent from './Authent';
import Groups from './Groups';

export default class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      lights_loaded: false,
      bridge_ip: "",
      username: "",
      lights: {}
    }
    this.setCredentials = this.setCredentials.bind(this);
  }

  setCredentials(username, bridge_ip) {
    this.setState({
      logged_in: true,
      bridge_ip: bridge_ip,
      username: username
    });
  }  

  componentDidUpdate() {
    if (this.state.logged_in & !this.state.lights_loaded) {
      fetch("http://" + this.state.bridge_ip + "/api/"
            + this.state.username, {
            method: "GET"
          }
      )
      .then(response => response.json())
      .then(response => {
        var groups = [];
        for (var group_id in response.groups) {
          var group = {name: response.groups[group_id].name, lights: []};
          for (var light_id in response.lights) {
            if (response.groups[group_id].lights.includes(String(light_id))) {
              var light = {name: response.lights[light_id].name, id: light_id};
              group.lights.push(light);
            }
          }
          groups.push(group);
        }
        this.setState({groups: groups});
      })
      .then(() => this.setState({lights_loaded: true}))
    }
  }
  render() {
    return(
      <div>
      <Authent setCredentials={this.setCredentials} />
      { this.state.lights_loaded ?
         <Groups groups={this.state.groups} /> :
         "Loading"
      }
      </div>
    )
  }
}
    

