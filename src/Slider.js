import React, { Component } from 'react';
import './Slider.css'

export default class Slider extends Component {
  render(){
    return (
      <div className="Slider">
        <input type="checkbox" defaultChecked={this.props.active} />
        <span className="slide-span"></span>
      </div>);
  }
}
