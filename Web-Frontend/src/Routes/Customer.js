import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import TopBar from '../components/utils/TopBar/Index';
import Main from '../components/views/MainPage/Index';
import Signup from '../components/views/SignupPage/Index';

const baseUrl = "/Customer/"

function Index(){
    return(
        <div>
            <TopBar/>
            <div className = "maincontainer" style={{height : "100%", overflowY : "auto", padding : "1vh", paddingBottom : "1vh", backgroundColor : "#fafafa", marginBottom : "10px"}}>
            <Router>
                <Switch>
                    <Route exact path={baseUrl} component={Main} />
                </Switch>
            </Router>
            </div>
        </div>
    )
}

export default Index;