import React, { Component } from 'react';
import './Clicker.css'

export default class Clicker extends Component {
  //groupname : string
  //selection
  constructor(props){
    super(props);
    this.state = {selected: false}
  }
  render(){
    return <button className="Clicker {this.props.group}">{this.props.option}</button>
  }
}
