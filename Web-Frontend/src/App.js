import React, {useState} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom"
import Routes from '../src/Routes/Index'
import Signup from '../src/Routes/SignUp'

function App(){
	return(
		<Router>
			<Switch>
				<Route exact path="/" component={Signup}/>
				<Route path="/main/" component={Routes} />
			</Switch>
		</Router>
	)
}

export default App;