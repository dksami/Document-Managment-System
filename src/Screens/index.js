import React from 'react';
import firebase from '../Firebase/';
import { Redirect } from 'react-router-dom'


export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      login : false
    }
    this.isuser()
  }
  isuser(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({login : true})
        } else {
          
        }
      });
  }

render(){

  return (
    <div>
                {!this.state.login?  <Redirect to='/Login'/>:<Redirect to='/Home'/> }</div>
  );
}}