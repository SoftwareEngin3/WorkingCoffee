import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import main from '../components/views/MainPage/Store'
import info from '../components/views/StorePage/Index'
import TopBar from '../components/utils/TopBar/Index';

const baseUrl = "/store/"

function Index(){
    return(
        <>
            <TopBar/>
            <div className = "maincontainer" style={{height : "100%", overflowY : "auto", padding : "1vh", paddingBottom : "1vh", backgroundColor : "#fafafa", marginBottom : "10px"}}>
            <Router>
                <Switch>
                    <Route exact path={baseUrl} component={main} />
                    <Route path={baseUrl + "info"} component={info} />
                </Switch>
            </Router>
            </div>
        </>
    )
}

export default Index;