import React, { Component } from 'react';
import './Clicker.css'

export default class Clicker extends Component {
  render(){

    return (
      <button className={`Clicker ${this.props.selected ? 'ClickSelect' : ''}`} onClick={ ()=>{this.props.onClick(this.props.route, this.props.option)} } >
        {this.props.option}
      </button>
    );
  }
}
