import React, { Component } from 'react';
import './Slider.css'

export default class Slider extends Component {
  constructor(props){
    super(props);
  }
  render(){
    return (
      <div className="Slider">
        <input type="checkbox" defaultChecked={this.props.active} />
        <span className="slide-span"></span>
      </div>);
  }
}
