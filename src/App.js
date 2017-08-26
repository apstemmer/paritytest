
import React, { Component } from "react";
import SimpleStorageContract from "../build/contracts/SimpleStorage.json";
import Clicker from "./Clicker.js";
import ClickBox from "./ClickBox.js"
import getWeb3 from "./utils/getWeb3";
import Slider from "./Slider.js";
import Increment from "./Increment.js";
import _ from "lodash";

import "./App.css"
import "./css/essentials.css"
import "./css/methodology.css"
import "./css/specs.css"
import "./css/profile.css"
import "./css/equipment.css"

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      desc: window.job
    }

    this.handleIncrement  = this.handleIncrement.bind(this);
    this.handleSelect  = this.handleSelect.bind(this);
    this.toggleSwitch  = this.toggleSwitch.bind(this);
  }

  componentWillMount() {
    // Get network provider and web3 instance.
    // See utils/getWeb3 for more info.

    getWeb3
    .then(results => {
      this.setState({
        web3: results.web3
      })

      // Instantiate contract once web3 provided.
      this.instantiateContract()
    })
    .catch(() => {
      console.log("Error finding web3.")
    });
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I"ve placed them here.
     */

    const contract = require("truffle-contract")
    const simpleStorage = contract(SimpleStorageContract)
    simpleStorage.setProvider(this.state.web3.currentProvider)

    // Declaring this for later so we can chain functions on SimpleStorage.
    var simpleStorageInstance

    // Get accounts.
    this.state.web3.eth.getAccounts((error, accounts) => {
      simpleStorage.deployed().then((instance) => {
        simpleStorageInstance = instance
        //console.log(accounts[0]);
        // Stores a given value, 5 by default.
        return simpleStorageInstance.set(9, {from: accounts[0]})
      }).then((result) => {
        // Get the value from the contract to prove it worked.
        return simpleStorageInstance.get.call(accounts[0])
      }).then((result) => {
        // Update state with the result.
        return this.setState({ storageValue: result.c[0] })
      })
    })
  }

  componentDidMount(){

  }

  handleSelect(location, updated){
    let newState = this.state.desc[location[0]];
    newState[location[1]] = updated;
    let temp = {};
    temp[location[0]] = newState;
    this.setState(temp);
  }

  toggleSwitch(loc){
    let newState = this.state.desc[loc[0]];

    newState[loc[1]] = !newState[loc[1]];
    let temp= {};
    temp[loc[0]] = newState;
    //console.log(temp);
    this.setState(temp);
  }

  handleIncrement(location, change, min, max){
    let spec = this.state.desc.specs;
    //hack for workweek being defined in seconds
    if(location === "workweek") {
      change *= 3600;
      max *= 3600;
      min *= 3600;
    }
    spec[location] += change;
    //ran into some gnarly rounding issues
    spec[location] = Number(spec[location].toFixed(1));
    if(spec[location] > max) spec[location] = max;
    if(spec[location] < min) spec[location] = min;
    this.setState({"specs":spec});
  }

  render() {
    let essentials = this.state.desc.essentials;
    let meth = this.state.desc.methodology;
    let specs = this.state.desc.specs;
    let profile = this.state.desc.profile;
    let equip = this.state.desc.equipment;
    let tech = this.state.desc.technologies;
    let oth = this.state.desc.other;
    let misc = this.state.desc.misc;

    let startdate = new Date(essentials.startdate);
    let methelem = [], methclick = [], profArray = [];
    for(var elem in meth){
      if(typeof meth[elem] === "boolean"){
        methelem.push(
          <div className={`slide-wrap ${elem}`}>
            <h4>{elem}</h4>
            <Slider active={meth[elem]} route={['methodology',elem]} onToggle={this.toggleSwitch}/>
          </div>
        );
      }
    }

    for(var elem in profile){
      profArray.push(
        <div className={`profile-part ${elem}`} style={{width:profile[elem]+"%"}}>
          <span>{elem}:{profile[elem]}%</span>
        </div>
      )
    }

    return (
      <div className="App">
        <header className="content-block">
          <h1>Position <br /> Vacant</h1>
          <div>
            <h3 className="subtitle">{window.job.headline}</h3>
            <p>Parity is looking for a new highly skilled javascript developer to join the team. See below for more information about open positions or post an alternative</p>
          </div>
        </header>

        <section className="essentials content-block">
          <div className="locations">
            <h5>locations</h5>
            <ClickBox list={essentials.locations} route={["essentials","locations"]} selected={essentials.locations[0]} onSelect={this.handleSelect} />
          </div>

          <div className="employment">
            <h5>employment</h5>
            <ClickBox list={essentials.employmentEnum.all} route={["essentials","employment"]} selected={essentials.employment} onSelect={this.handleSelect} />
          </div>

          <div className="startdate">
            <h5>start date</h5>
            <span>{startdate.getDate()} / {startdate.getMonth()} / {startdate.getFullYear()}</span>
          </div>

          <div className="salary">
            <h4>{essentials.salary.status} Salary </h4>
            <div>{`${essentials.salary.amount} ${essentials.salary.currency}/${essentials.salary.interval}`}</div>
            <span>stocks: {essentials.salary.stockoptions ? "yup" : "nope"}</span>
          </div>

          <div className="industry">
            <h5>industry</h5>
            <span>{essentials.industry}</span>
          </div>

          <div className="companysize">
            <h5>size of company</h5>
            <ClickBox list={essentials.companysizeEnum.all} route={["essentials","companysize"]} selected={essentials.companysize} onSelect={this.handleSelect} />
          </div>

          <div className="teamsize">
            <h5>size of team</h5>
            <span>{essentials.teamsize.min} - {essentials.teamsize.max}</span>
          </div>
        </section>

        <section className="methodology content-block">
          {methelem}
          <div className="click-wrap">
            <h5>buildserver</h5>
            <ClickBox list={meth.buildserverEnum.all} route={["methodology","buildserver"]} selected={meth.buildserver} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>static code analysis</h5>
            <ClickBox list={meth.staticcodeanalysisEnum.all} route={["methodology","staticcodeanalysis"]} selected={meth.staticcodeanalysis} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>version control</h5>
            <ClickBox list={meth.versioncontrolEnum.all} route={["methodology","versioncontrol"]} selected={meth.versioncontrol} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>issue tracker</h5>
            <ClickBox list={meth.issuetrackerEnum.all} route={["methodology","issuetracker"]} selected={meth.issuetracker} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>knowledge repo</h5>
            <ClickBox list={meth.knowledgerepoEnum.all} route={["methodology","knowledgerepo"]} selected={meth.knowledgerepo} onSelect={this.handleSelect} />
          </div>

          <div className="click-wrap">
            <h5>agile management</h5>
            <ClickBox list={meth.agilemanagementEnum.all} route={["methodology","agilemanagement"]} selected={meth.agilemanagement} onSelect={this.handleSelect} />
          </div>

        </section>

        <section className="specs content-block">

          <div className="increment-wrapper">
            <div className="workload">
              <h5>workload</h5>
              <Increment loc="workload" min={0.1} max={10} step={0.1} val={specs.workload} handleChange={this.handleIncrement}/>
            </div>
            <div className="workweek">
              <h5>workweek</h5>
              <Increment loc="workweek" min={1} max={100} step={1} val={specs.workweek/3600} handleChange={this.handleIncrement}/>
            </div>
            <div className="holdidays">
              <h5>holidays</h5>
              <Increment loc="holidays" min={0} max={90} step={1} val={specs.holidays} handleChange={this.handleIncrement}/>
            </div>
          </div>

          <div className="corehours">
            <h5>core hours</h5>
            <span> {specs.corehours.from} to {specs.corehours.to}</span>
          </div>

          <div className="travel">
            <h5>travel</h5>
            <ClickBox list={specs.travelEnum.all} route={["specs","travel"]} selected={specs.travel} onSelect={this.handleSelect} />
          </div>

          <div className="remote">
            <h5>remote</h5>
            <ClickBox list={specs.remoteEnum.all} route={["specs","remote"]} selected={specs.remote} onSelect={this.handleSelect} />
          </div>

          <div className="relocationpackage">
            <h5>relocation</h5>
            <ClickBox list={specs.relocationpackageEnum.all} route={["specs","relocationpackage"]} selected={specs.relocationpackage} onSelect={this.handleSelect} />
          </div>
        </section>

        <section className="content-block profile">
          {profArray}
        </section>

        <section className="content-block equipment">
          <div className="operatingsystem">
            {equip.operatingsystemEnum.all.map((elem)=>{
              return (<div className={`os-item ${equip.operatingsystem.indexOf(elem)? "os-select":""}`}>
                <img src={require(`./images/${elem}.svg`)}/>
                <h4>{elem}</h4>
              </div>);
            })}
          </div>
          <div className="computer">
            <h5>computer</h5>
            <ClickBox list={equip.computerEnum.all} route={["equipment","computer"]} selected={equip.computer} onSelect={this.handleSelect} />
          </div>
          <div>
            <h5>monitors</h5>
            <span>{equip.monitors}</span>
          </div>
        </section>
        <footer>
        </footer>
      </div>
    );
  }
}

export default App
