import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Routes from '../src/Routes/Index'
import Signup from '../src/Routes/SignUp'
import Store from '../src/Routes/Store'

function App(){
	return(
		<Router>
			<Switch>
				<Route path="/main/" component={Routes} />
				<Route path="/store/" component={Store} />
				<Route path="/" component={Signup}/>
			</Switch>
		</Router>
	)
}

export default App;