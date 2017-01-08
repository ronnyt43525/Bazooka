import React from "react";
import Button from "../../../Shared/Button";
import Input from "../../../Shared/Input";
import Select from "../../../Shared/Select";
import Textarea from "../../../Shared/Textarea";
import Grid from "../../../Shared/Grid";
import Tabs from "../../../Shared/Tabs";
import Actions from "./Actions";

var EditPage = React.createClass({
  getInitialState:function(){
    return {
      Id:0,
      EnviromentId:0,
      Name:"",
      Script:""
    };
  },

  componentDidMount:function(){
    this.update(this.props.params.taskId);
  },

  componentWillReceiveProps(nextProps){
    if(this.props.params.taskId!=nextProps.params.taskId){
      this.update(nextProps.params.taskId);
    }
  },

  update(taskId){
    Actions.getLocalScriptTask(taskId).then(x => {
      this.setState(x);
    });
  },

  save:function(){
    if(this.state.Name!="" && this.state.Script!=""){
      Actions.updateLocalScriptTask(this.state.Id,this.state.Name, this.state.Script, this.state.EnviromentId, this.state.ApplicationId)
    }
  },

  render:function(){
    return(
      <div>
           <input title="Name" placeholder="Name" autoFocus value={this.state.Name} onChange={(e)=> this.setState({Name: e.target.value})} />
           <Textarea title="Script" placeholder="Script" value={this.state.Script} onChange={(e)=> this.setState({Script: e.target.value})}  />
       <Button primary onClick={this.save}>Save</Button>
       </div>
);
   }
});


module.exports=EditPage;