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
    return(
      <ListItem button onClick={this.toggleLight} selected={this.state.selected}>
        <ListItemText primary={this.props.name} inset={true}/>
      </ListItem>
    )
  }  
}    
