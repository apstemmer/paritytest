import React, { Component } from 'react';
import './Clicker.css'

export default class Clicker extends Component {
  render(){
    return (
      <button className={`Clicker ${this.props.group} ${this.props.selected ? 'ClickSelect' : ''}`}>
        {this.props.option}
      </button>
    );
  }
}
