import React, { Component } from 'react';
import './Authent.css';
import Toolbar from '@material-ui/core/Toolbar';

export default class Authent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bridge_ip : null,
      error: false,
      logged_in: false,
      message: "",
      username: localStorage.getItem('username')
    }
    this.getAccess = this.getAccess.bind(this);
    this.checkAccess = this.checkAccess.bind(this);
  }

  componentDidMount() {
    fetch("https://discovery.meethue.com")
    .then(response => response.json())
    .then(data => {
      if (data.length === 1) {
        this.setState({bridge_ip: data[0].internalipaddress})
      } else {
        this.setState({error: "Could not find bridge"})
      }
    })
    .then(() => this.checkAccess())
  }

  checkAccess() {
    fetch("http://" + this.state.bridge_ip + "/api/"
          + this.state.username, {
          method: "GET"
        }
    )
    .then(response => response.json())
    .then(response => {
      if ("lights" in response) {
        this.setState({logged_in: true});
        this.props.setCredentials(this.state.username, this.state.bridge_ip);
      } else {
        var intervalId = setInterval(this.getAccess, 1000);
        this.setState({intervalId: intervalId});
      }
    })
  }
  getAccess() {
    fetch("http://" + this.state.bridge_ip + "/api", {
          body: JSON.stringify({"devicetype":"trip"}),
          method: "POST"
        }
    )
    .then(response => response.json())
    .then(response => {
      if ("error" in response[0]) {
        this.setState({error: true, message: response[0].error.description});
      } else if ("success" in response[0]) {
        this.setState({
          message: "success", 
          username: response[0].success.username,
          logged_in: true
        });
        this.props.setCredentials(response[0].success.username, this.state.bridge_ip);
        localStorage.setItem("username", response[0].success.username);
        clearInterval(this.state.intervalId);
      }
    })
  }

  componentWillUnmount() {
    clearInterval(this.state.intervalId);
  }

  render() {
    return (
      <Toolbar>
      <div className={"Authent"}>
        {this.state.error ? 
          <div className="Error">
            {this.state.message}
          </div>
        :
          <div className={this.state.logged_in ? "Connected" : "Connecting"}>
            {this.state.logged_in ? "Connected" : "Connecting"}
          </div>
        }
      </div>
      </Toolbar>
    )
  }
}
