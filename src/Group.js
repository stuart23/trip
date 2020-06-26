import React, { Component } from 'react';
import Lights from './Lights';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import Collapse from '@material-ui/core/Collapse';

export default class Group extends Component {
  constructor(props) {
    // super(props);
    super();

    this.state = {open: false};
    this.toggleOpen = this.toggleOpen.bind(this);
  }

  toggleOpen() {
    this.setState({open: !this.state.open});
  }


  render() {
    const lights = <Lights
      lights={this.props.lights}
      activateLight={this.props.activateLight}
      deactivateLight={this.props.deactivateLight}
    />;
    return(
      <div>
      <ListItem button onClick={this.toggleOpen}>
        <ListItemText primary={this.props.name} />
        {this.state.open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={this.state.open} timeout="auto" unmountOnExit>
      {lights}
      </Collapse>
      </div>
    )
  }
}
