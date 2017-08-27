import React, { Component } from 'react';
import Clicker from './Clicker.js'
import './ClickBox.css'

export default class ClickBox extends Component {

  render(){
    return (
    <div className="ClickBox">
      {this.props.list.map((elem)=>{
        return <Clicker key={elem} route={this.props.route} option={elem} selected={this.props.selected === elem} onClick={this.props.onSelect} />
      })}
    </div>
    );
  }
}
