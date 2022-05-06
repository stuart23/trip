import React, { Component } from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import { withStyles } from '@material-ui/styles';

import Debug from './Debug';

const styles = {
  connected: {
    padding: "1em",
    fontWeight: "bold",
    fontSize: "x-large",
    color: "white",
    textShadow: "0 0 2px #0F0, 0 0 4px #0B0, 0 0 6px #070",
  },
  connecting: {
    padding: "1em",
    fontWeight: "bold",
    fontSize: "x-large",
    color: "white",
    textShadow: "0 0 2px #F80, 0 0 4px #B60, 0 0 6px #740",
  },
  error: {
    padding: "1em",
    fontWeight: "bold",
    fontSize: "x-large",
    color: "red",
    textShadow: "0 0 2px #DDD, 0 0 4px #888, 0 0 6px #444",
  }
}

class Authent extends Component {
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
    .then((response) => {
      if (response.ok) {
        return response.json();
      } elif (response.status === 429) {
        this.setState({error: "You have made too many requests. Wait 15 mins and try again."});
      }
    })
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
    const url = "https://" + this.state.bridge_ip + "/api/" + this.state.username;
    console.log('Bridge URL:', url);
    fetch({
          url,
          method: "GET"
    })
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
    .catch((error) => {
      console.error('Error:', error);
      this.setState({error: error});
    });
  }
  getAccess() {
    fetch("https://" + this.state.bridge_ip + "/api", {
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
    const {classes} = this.props;
    return (
      <Toolbar>
        {this.state.error ?
          <div className={classes.error}>
            {this.state.message}
          </div>
        :
          <div className={this.state.logged_in ? classes.connected : classes.connecting}>
            {this.state.logged_in ? "Connected" : "Connecting"}
          </div>
        }
        <Debug
          bridge_ip={this.state.bridge_ip}
          error={this.state.error}
          message={this.state.message}
          logged_in={this.state.logged_in}
          />
      </Toolbar>
    )
  }
}

export default withStyles(styles)(Authent);
