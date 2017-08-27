import React, { Component } from 'react';
import './Slider.css'

export default class Slider extends Component {
  render(){
    return (
      <div className="Slider" onClick={()=>{
        this.props.onToggle(this.props.route);
      }} >
        <input type="checkbox" checked={ this.props.active }  />
        <span className="slide-span"></span>
      </div>);
  }
}
