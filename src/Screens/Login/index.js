import React from 'react';
import LoginPage from './Theme/LoginPage'
import firebase from '../../Firebase/';
import SimpleSnackbar from './Theme/Snackbar'
import { Redirect } from 'react-router-dom'


export default class Login extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      text : "",
      open : false,
      redirect : false
    }
    this.isuser()
  }
  isuser(){
      firebase.auth().onAuthStateChanged((user) => {
        if (user) {
          this.setState({redirect : true})
        } else {
          
        }
      });
  }
  LoginNow = (email,password)=>{
    firebase.auth().signInWithEmailAndPassword(email, password).catch((error) => {
    
      return this.showerror(error.message)
      // ...
    }).then((res)=>{
      if(typeof(res)== "undefined"){

      }else{
        console.log(res.user.uid)
      }
    });
  }
  showerror= (text)=>{
    console.log(text)
    this.setState({text:text,open:true})
  }
  hideerror = () =>{
    this.setState({ text : "",
    open : false})
  }
render(){
  const {open , text,redirect } = this.state

  return (
    <div>
                {redirect?  <Redirect to='/Home'/>:(<div>
      <LoginPage Login={this.LoginNow} />
      {this.state.open ? (<SimpleSnackbar hideerror={this.hideerror} text={text} open={open}/>): (<br/>)}
     </div>           )}</div>
  );
}}