import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import main from '../components/views/MainPage/Store'
import info from '../components/views/StorePage/Index'
import review from '../components/views/StorePage/checkReview'
import TopBar from '../components/utils/TopBar/Index';

const baseUrl = "/store/"

function Index(){
    return(
        <>
            <TopBar/>
            <div className = "maincontainer" style={{height : "100%", overflowY : "auto", backgroundColor : "#fafafa", marginBottom : "10px"}}>
            <Router>
                <Switch>
                    <Route exact path={baseUrl} component={main} />
                    <Route path={baseUrl + "info"} component={info} />
                    <Route path={baseUrl + "review"} component={review} />
                </Switch>
            </Router>
            </div>
        </>
    )
}

export default Index;