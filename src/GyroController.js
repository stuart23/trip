import React, { Component } from 'react';

export default class ReactAccelerometer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      x: null,
      y: null,
      z: null,
      hue: 0,
      landscape: false,
      intervalId: null,
      red: 0,
      green: 0,
      blue: 0,
    }

    this.handleAcceleration = this.handleAcceleration.bind(this);
    this.handleOrientation = this.handleOrientation.bind(this);
    this.updateLights = this.updateLights.bind(this);
  }

  componentDidMount () {
    this.handleOrientation()
    window.addEventListener('devicemotion', this.handleAcceleration)
    window.addEventListener('orientationchange', this.handleOrientation)

    var intervalId = setInterval(this.updateLights, 100);
    this.setState({intervalId: intervalId});
  }

  componentWillUnmount () {
    window.removeEventListener('devicemotion', this.handleAcceleration)
    window.removeEventListener('orientationchange', this.handleOrientation)
    clearInterval(this.state.intervalId);
  }

  handleOrientation (event) {
    const { orientation } = window
    this.setState({ landscape: orientation === 90 || orientation === -90 })
  }

  handleAcceleration (event) {
    const { landscape } = this.state
    const { useGravity } = this.props
    const acceleration = useGravity ? event.accelerationIncludingGravity : event.acceleration
    const { x, y, z } = acceleration

    this.setState({
      x: x, y: y, z: z
    })
  }

  updateLights() {
    var hue = Math.round(65534/2 + (-this.state.x/8.5*65534/2));
    hue = Math.max(0, hue);
    hue = Math.min(hue, 65534);
    var red = 0;
    var green = 0;
    var blue = 0;
    if (hue < 65534/6 ) {
      red = 255;
      green = Math.round(hue/(65534/6)*255);
    } else if (hue < 65534/3 ) {
      red = Math.round(255*(2-hue/(65534/6)));
      green = 255;
    } else if (hue < 65534/2) {
      green = 255;
      blue = Math.round(255*(hue/(65534/6)-2));
    } else if (hue < 65534*2/3) {
      green = Math.round(255*(4-hue/(65534/6)));
      blue = 255;
    } else if (hue < 65534*5/6) {
      red = Math.round(255*(hue/(65534/6)-4));
      blue = 255;
    } else {
      red = 255;
      blue = Math.round(255*(6-hue/(65534/6)));
    }
    this.props.control({"hue": hue, "sat": 254, "transitiontime": 1, "colormode": "hs"});
    this.setState({red: red, green: green, blue: blue, hue: hue});
  }

  render () {
    return(
      <div style={{background: "#FF0000"}}>
        <div>
        {this.state.red.toString(16)}
        </div>
        <div>
        {this.state.green.toString(16)}
        </div>
        <div>
        {this.state.blue.toString(16)}
        </div>
        {this.state.hue}
      </div>
    )
  }
}
