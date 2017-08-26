
import React, { Component } from 'react';
import SimpleStorageContract from '../build/contracts/SimpleStorage.json';
import Clicker from './Clicker.js';
import ClickBox from './ClickBox.js'
import getWeb3 from './utils/getWeb3';
import Slider from './Slider.js';
import Increment from './Increment.js';
import _ from 'lodash';

import './App.css'
import './css/essentials.css'
import './css/methodology.css'
import './css/specs.css'
import './css/profile.css'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      storageValue: 0,
      web3: null,
      desc: window.job
    }

    this.handleIncrement  = this.handleIncrement.bind(this);
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
      console.log('Error finding web3.')
    });
  }

  instantiateContract() {
    /*
     * SMART CONTRACT EXAMPLE
     *
     * Normally these functions would be called in the context of a
     * state management library, but for convenience I've placed them here.
     */

    const contract = require('truffle-contract')
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
      if(typeof meth[elem] === 'boolean'){
        methelem.push(
          <div className={`slide-wrap ${elem}`}>
            <h4>{elem}</h4>
            <Slider active={meth[elem]} />
          </div>
        );
      }
    }

    for(var elem in profile){
      profArray.push(
        <div className={`profile-part ${elem}`} style={{width:profile[elem]+'%'}}>
          {elem}:{profile[elem]}%
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
            <ClickBox list={essentials.locations} group="locations" selected={essentials.locations[0]} />
          </div>

          <div className="employment">
            <h5>employment</h5>
            <ClickBox list={essentials.employmentEnum.all} group="employment" selected={essentials.employment} />
          </div>

          <div className="startdate">
            <h5>start date</h5>
            <span>{startdate.getDate()} / {startdate.getMonth()} / {startdate.getFullYear()}</span>
          </div>

          <div className="salary">
            <h4>{essentials.salary.status} Salary </h4>
            <div>{`${essentials.salary.amount} ${essentials.salary.currency}/${essentials.salary.interval}`}</div>
            <span>stocks: {essentials.salary.stockoptions ? 'yup' : 'nope'}</span>
          </div>

          <div className="industry">
            <h5>industry</h5>
            <span>{essentials.industry}</span>
          </div>

          <div className="companysize">
            <h5>size of company</h5>
            <ClickBox list={essentials.companysizeEnum.all} group="companysize" selected={essentials.companysize} />
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
            <ClickBox list={meth.buildserverEnum.all} group="buildserver" selected={meth.buildserver} />
          </div>

          <div className="click-wrap">
            <h5>static code analysis</h5>
            <ClickBox list={meth.staticcodeanalysisEnum.all} group="staticcodeanalysis" selected={meth.staticcodeanalysis} />
          </div>

          <div className="click-wrap">
            <h5>version control</h5>
            <ClickBox list={meth.versioncontrolEnum.all} group="versioncontrol" selected={meth.versioncontrol} />
          </div>

          <div className="click-wrap">
            <h5>issue tracker</h5>
            <ClickBox list={meth.issuetrackerEnum.all} group="issuetracker" selected={meth.issuetracker} />
          </div>

          <div className="click-wrap">
            <h5>knowledge repo</h5>
            <ClickBox list={meth.knowledgerepoEnum.all} group="knowledgerepo" selected={meth.knowledgerepo} />
          </div>

          <div className="click-wrap">
            <h5>agile management</h5>
            <ClickBox list={meth.agilemanagementEnum.all} group="agilemanagement" selected={meth.agilemanagement} />
          </div>

        </section>

        <section className="specs content-block">

          <div className="increment-wrapper">
            <div className="workload">
              <h4>workload</h4>
              <Increment loc="workload" min={0.1} max={10} step={0.1} val={specs.workload} handleChange={this.handleIncrement}/>
            </div>
            <div className="workweek">
              <h4>workweek</h4>
              <Increment loc="workweek" min={1} max={100} step={1} val={specs.workweek/3600} handleChange={this.handleIncrement}/>
            </div>
            <div className="holdidays">
              <h4>holidays</h4>
              <Increment loc="holidays" min={0} max={90} step={1} val={specs.holidays} handleChange={this.handleIncrement}/>
            </div>
          </div>

          <div className="corehours">
            <h4>core hours</h4>
            <span> {specs.corehours.from} to {specs.corehours.to}</span>
          </div>

          <div className="travel">
            <h4>travel</h4>
            <ClickBox list={specs.travelEnum.all} group="travel" selected={specs.travel} />
          </div>

          <div className="remote">
            <h4>remote</h4>
            <ClickBox list={specs.remoteEnum.all} group="remote" selected={specs.remote} />
          </div>

          <div className="relocationpackage">
            <h4>relocation</h4>
            <ClickBox list={specs.relocationpackageEnum.all} group="relocationpackage" selected={specs.relocationpackage} />
          </div>
        </section>

        <section className="content-block profile">
          {profArray}
        </section>

        <section className="content-block equipment">
          <div className="operatingsystem">
            {equip.operatingsystemEnum.all.map((elem)=>{
              return (<div className={`os-item ${equip.operatingsystem.indexOf(elem)? 'os-select':''}`}>
                elem
              </div>);
            })}
          </div>
          <div className="computer">
            <h4>computer</h4>
            <ClickBox list={equip.computerEnum.all} group="computer" selected={equip.computer} />
          </div>
          <div>
            <h4>monitors</h4>
            <span>{equip.monitors}</span>
          </div>
        </section>
      </div>
    );
  }
}

export default App
