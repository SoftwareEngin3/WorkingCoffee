import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Signup from '../components/views/SignupPage/Index';
import Login from '../components/views/LoginPage/Index';

const baseUrl = "/"

function Index(){
    return(
        <>
            <Router>
                <Switch>
                    <Route exact path={baseUrl} component={Login} />
                    <Route path={baseUrl+"signup"} component={Signup} />
                </Switch>
            </Router>
        </>
    )
}

export default Index;