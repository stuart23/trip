import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';

const styles = {
  on_button: {
    background: 'linear-gradient(45deg, #F0FF6B 30%, #7CFF6B 90%)',
    borderRadius: 3,
    border: 0,
    color: 'black',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
  off_button: {
    background: 'linear-gradient(45deg, #C15169 30%, #BC693E 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
  },
};

class LightController extends Component {
  constructor(props) {
    super(props);
    this.switchOn = this.switchOn.bind(this);
    this.switchOff = this.switchOff.bind(this);
  }

  switchOn() {
    this.props.control({"on": true});
  }

  switchOff() {
    this.props.control({"on": false});
  }

  render() {
    const {classes} = this.props;
    return(
      <div align="center">
        <Button className={classes.on_button} onClick={this.switchOn}>
          Switch On
        </Button>
        <Button className={classes.off_button} onClick={this.switchOff}>
          Switch Off
        </Button>
      </div>
    )
  }  
}

export default withStyles(styles)(LightController);
