import React, { Component } from 'react';
import Slider from '@material-ui/core/Slider';

export default class BrightnessSlider extends Component {
  constructor(props) {
    super(props)
    this.state = {value: 50};
    this.handleChange = this.handleChange.bind(this);
  };

  handleChange(event, newValue) {
    this.setState({value: newValue});
    this.props.control({"bri": newValue})
  };

  render () {
    return (
      <div>
      {this.state.value}
      <Slider
        defaultValue={50}
        aria-labelledby="continuous-slider"
        min={0}
        max={100}
        onChange={this.handleChange}
      />
      </div>
    )
  }
}
