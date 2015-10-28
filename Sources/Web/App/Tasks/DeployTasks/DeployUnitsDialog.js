import React from "react";
import LinkedState from "react/lib/LinkedStateMixin";
import Router from 'react-router';
import Actions from "./ActionsCreator";
import Store from "./Store";
import Modal from "react-bootstrap/lib/Modal";


var CreateDialog = React.createClass({
  mixins: [LinkedState],

  getInitialState: function() {
    if(this.props.Env!=null){
      return {
        name:this.props.Env.Name,
        machine:this.props.Env.Machine,
        packageName: this.props.Env.PackageName,
        directory:this.props.Env.Directory,
        repository:this.props.Env.Repository,
        key:"",
        value:"",
        Encrypted:false,
        params : this.props.Env.Parameters
      };
    }

    return {
      name:"",
      machine:"",
      packageName: "",
      directory:"",
      repository:"",
      key:"",
      value:"",
      Encrypted:false,
      params : [],
      Agents:[]
    };
  },

  componentDidMount:function(){
    Actions.getAgents(this.props.Enviroment).then(x => {
      this.setState({Agents:x})
    })
  },


  /**
   * Creates the new deployUnit and then closes the dialog if all
   * parameters are set
   */
  create:function(){
    if(this.state.name.length != 0 &&
      this.state.packageName.length != 0 &&
      this.state.repository.length != 0 &&
      this.state.directory.length != 0){

      if(this.props.Env!=null){
        Actions.modifyDeployUnit(
          this.props.Env.Id,
          this.props.Enviroment,
          this.state.name,
          this.state.machine,
          this.state.packageName,
          this.state.directory,
          this.state.repository,
          this.state.params)
               .then(x => this.props.onRequestHide());
               return;
      }

      Actions.createDeployUnit(
        this.props.Enviroment,
        this.state.name,
        this.state.machine,
        this.state.packageName,
        this.state.directory,
        this.state.repository,
        this.state.params,this.props.ApplicationId)
             .then(x => {this.props.onCreate();this.props.onRequestHide();});
    }
    return false;
  },

  /**
   * Adds a new parameter to the list if key and value are set
   * an there isn't already another parameter with the same key
   */
  addParameter : function(){
    if(this.state.key.length!=0 &&
      this.state.value.length != 0 &&
       !this.state.params.some(x => x.Key == this.state.key)){
      this.setState({
        params: this.state.params.concat({
          Name: this.state.key,
          Value: this.state.value,
          Encrypted:this.state.Encrypted
        }),
        key:"",
        value:"",
        Encrypted:false
      })
    }
  },

  remove: function(key){
    var index = -1;
    var i;
    for(i = 0; i < this.state.params.length; i++){
      if(this.state.params[i].Name==key){
        index=i;
        break;
      }
    }
    this.state.params.splice(index,1);
    this.setState({
      params: this.state.params
    });
  },


  testAgent : function(){
    Actions.testAgent(this.state.machine).then(x => {
      alert("Agent responding");
    }).fail(x =>{
        alert("Agent not responding");
    });
    return false;
  },

  render:function(){
    return(
      <Modal {...this.props} backdrop="static" title="Create new deploy unit">
      <div className="modal-body">
        <form role="form" onSubmit={this.create}>
          <div className="form-group">
            <label htmlFor="Name">Name</label>
            <input type="text" className="form-control" id="Name" placeholder="Name" autoFocus valueLink={this.linkState('name')} />
          </div>
          <div className="form-group">
            <label htmlFor="Machine">Machine</label>
              <select  className="form-control" id="Machine" valueLink={this.linkState('machine')}>
                <option></option>
                {this.state.Agents.map(x => (<option value={x.Id}>{x.Name}- {x.Address}</option>))}
             </select>


          </div>
          <div className="form-group">
            <label htmlFor="PackageName">PackageName</label>
            <input type="text" className="form-control" id="PackageName" placeholder="PackageName" valueLink={this.linkState('packageName')} />
          </div>
          <div className="form-group">
            <label htmlFor="Directory">Directory</label>
            <input type="text" className="form-control" id="Directory" placeholder="Directory" valueLink={this.linkState('directory')} />
          </div>
          <div className="form-group">
          <label htmlFor="Repository">Repository</label>
          <input type="text" className="form-control" id="Repository" placeholder="Repository" valueLink={this.linkState('repository')} />
          </div>
        </form>
      </div>
      <div className="modal-footer">
        <button className="btn btn-primary" onClick={this.create}>Create</button>
        <button className="btn" onClick={this.props.onRequestHide}>Close</button>
      </div>
      </Modal>);
    }
  });
    module.exports = CreateDialog;
