"use strict";
import React, { Component } from 'react';
import './Increment.css'

export default class Increment extends Component {
  render(){
    return (
      <div className="Increment">
        <div className="inc-num"><span>{this.props.val}</span></div>
        <button onClick={()=>{this.props.handleChange(this.props.loc,this.props.step,this.props.min, this.props.max)}} className="up">^</button>
        <button onClick={()=>{this.props.handleChange(this.props.loc,-this.props.step,this.props.min, this.props.max)}} className="down">^</button>
      </div>);
  }
}

// <input type="number" min={this.props.min} max={this.props.max} step={this.props.step} value={this.props.val}
// onChange={(event)=>{this.props.handleChange(event, this.props.loc)}}
//  />
