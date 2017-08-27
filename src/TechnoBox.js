import React, { Component } from 'react';
import "./TechnoBox.css"

export default class TechnoBox extends Component {

  render(){
    if(typeof this.props.level === "string"){
      return (
      <div className={`TechnoBox level-${this.props.level}`}>
        <img src={require(`./images/${this.props.title}.svg`)} alt={this.props.title} />
        <h5>{this.props.title}</h5>
      </div>
      );
    }
    else if(Object.prototype.toString.call(this.props.level) === '[object Object]'){
      return <div></div>
    }
  }
}
