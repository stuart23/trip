import React, { Component } from 'react';
import Group from './Group';

export default class Groups extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const groups = this.props.groups.map(group =>
      <Group name={group.name} lights={group.lights} />
    );
    return(groups);
  } 
}    
