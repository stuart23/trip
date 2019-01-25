import React, { Component } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

export default class Light extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: false
    };
    this.toggleLight = this.toggleLight.bind(this);
  }

  toggleLight() {
    if (this.state.selected) {
      this.props.deactivateLight(this.props.id);
      this.setState({selected: false});
    } else {
      this.props.activateLight(this.props.id);
      this.setState({selected: true});
    }
  }

  render() {
    //  <div onClick={this.toggleLight}>
    return(
      <ListItem button>
        <ListItemText primary={this.props.name} />
      </ListItem>
    )
  }  
}    
