import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './Screens/Login';
import Home from './Screens/Home';
import Index from './Screens';
import { Provider } from 'react-redux'
import store from './Redux/Store'

class App extends React.Component {


  render(){
	return (
		<Provider store={store}> 
			<Router>
				<Route exact path="/" component={Index} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/home" component={Home} />
			</Router>
		</Provider>
	);
}
}

export default App;
