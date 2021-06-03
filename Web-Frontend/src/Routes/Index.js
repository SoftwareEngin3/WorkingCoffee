import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import TopBar from '../components/utils/TopBar/Index';
import LeftBar from '../components/utils/LeftBar/Index';
import Main from '../components/views/MainPage/Index';
import Signup from '../components/views/SignupPage/Index';

const baseUrl = "/main/"

function Index(){
    return(
        <>
            <TopBar/>
            <Router>
                <Switch>
                    <Route exact path={baseUrl} component={Main} />
                </Switch>
            </Router>
        </>
    )
}

export default Index;