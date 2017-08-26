import React, { Component } from 'react';
import Clicker from './Clicker.js'
import './ClickBox.css'

export default class ClickBox extends Component {

  render(){
    console.log(this.props);
    return (
    <div>
      {this.props.list.map((elem)=>{
        console.log(this.props.selected, elem);
        return <Clicker key={elem} group={this.props.group} option={elem} selected={this.props.selected === elem}/>
      })}
    </div>
    );
  }
}
