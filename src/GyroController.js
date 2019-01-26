import React, { Component } from 'react';

export default class ReactAccelerometer extends Component {
  constructor (props) {
    super(props)

    this.state = {
      x: null,
      y: null,
      z: null,
      rotation: null,
      landscape: false
    }

    this.handleAcceleration = this.handleAcceleration.bind(this);
    this.handleOrientation = this.handleOrientation.bind(this);
  }

  componentDidMount () {
    this.handleOrientation()
    window.addEventListener('devicemotion', this.handleAcceleration)
    window.addEventListener('orientationchange', this.handleOrientation)
  }

  componentWillUnmount () {
    window.removeEventListener('devicemotion', this.handleAcceleration)
    window.removeEventListener('orientationchange', this.handleOrientation)
  }

  handleOrientation (event) {
    const { orientation } = window
    this.setState({ landscape: orientation === 90 || orientation === -90 })
  }

  handleAcceleration (event) {
    const { landscape } = this.state
    const { useGravity, multiplier } = this.props
    const acceleration = useGravity ? event.accelerationIncludingGravity : event.acceleration
    const rotation = event.rotationRate || null
    const { x, y, z } = acceleration

    this.setState({
      rotation,
      x: (landscape ? y : x) * multiplier,
      y: (landscape ? x : y) * multiplier,
      z: z * multiplier
    })
  }

  render () {
    const { x, y, z, rotation } = this.state

    /**
     * We have to detect if one of the values was ever set by the 'devicemotion' event,
     * as some browsers implement the API, but the device itself doesn't support.
     */
    console.log(this.state);
    return(
      <div>
        <div>
         { x }
        </div>
        <div>
         { y }
        </div>
        <div>
         { z }
        </div>
      </div>
    )
  }
}
