import React, { Component } from 'react';
import Authent from './Authent';
import Groups from './Groups';
import LightController from './LightController';
import GyroController from './GyroController';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import AppBar from '@material-ui/core/AppBar';

export default class Trip extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      lights_loaded: false,
      bridge_ip: "",
      username: "",
      lights: {},
      active_lights: []
    }
    this.setCredentials = this.setCredentials.bind(this);
    this.activateLight = this.activateLight.bind(this);
    this.deactivateLight = this.deactivateLight.bind(this);
  }

  setCredentials(username, bridge_ip) {
    this.setState({
      logged_in: true,
      bridge_ip: bridge_ip,
      username: username
    });
  }  

  activateLight(light_id) {
    this.setState({
      active_lights: this.state.active_lights.concat(light_id)
    });
  }

  deactivateLight(light_id) {
    this.setState({
      active_lights: this.state.active_lights.filter(id => id !== light_id)
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
        <div>
        <AppBar position="sticky">
          <Authent setCredentials={this.setCredentials} />
        </AppBar>
        </div>
        { this.state.lights_loaded ?
          <List component="div" disablePadding>
          <Groups
            groups={this.state.groups}
            activateLight={this.activateLight}
            deactivateLight={this.deactivateLight}
          />
          </List> :
           "Loading"
        }
        <GyroController />
        <LightController
          active_lights={this.state.active_lights}
          bridge_ip={this.state.bridge_ip}
          username={this.state.username}
        />
      </div>
    )
  }
}
    

