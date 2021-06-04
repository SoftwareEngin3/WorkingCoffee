import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Customer from '../src/Routes/Customer'
import Signup from '../src/Routes/SignUp'
import Store from '../src/Routes/Store'

function App(){
	return(
		<Router>
			<Switch>
				<Route path="/customer/" component={Customer} />
				<Route path="/store/" component={Store} />
				<Route path="/" component={Signup}/>
			</Switch>
		</Router>
	)
}

export default App;