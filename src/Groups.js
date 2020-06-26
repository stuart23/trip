import React, { Component } from 'react';
import Group from './Group';

export default class Groups extends Component {
  render() {
    const groups = this.props.groups.map(group =>
      <Group
        name={group.name}
        lights={group.lights}
        activateLight={this.props.activateLight}
        deactivateLight={this.props.deactivateLight}
      />
    );
    return(groups);
  }
}
