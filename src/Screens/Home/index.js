import React from 'react';
import firebase from '../../Firebase/';
import Dashboard from './theme/Dashboard';
import { Redirect } from 'react-router-dom'

export default class Login extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			redirect: false
		};
		this.isuser();
	}
	isuser() {
		firebase.auth().onAuthStateChanged((user) => {
			if (user) {
			} else {
				this.setState({ redirect: true });
			}
		});
	}
	render() {
		return <div>{this.state.redirect ? <Redirect to="/login" /> : <Dashboard />}</div>;
	}
}
