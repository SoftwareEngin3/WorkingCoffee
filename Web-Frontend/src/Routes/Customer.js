import React, {useEffect, useState} from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import TopBar from '../components/utils/TopBar/Index';
import Main from '../components/views/MainPage/Index';
import Book from '../components/views/BookPage/Customer';


const baseUrl = "/Customer/"

function Index(){
    return(
        <div>
            <TopBar/>
            <div className = "maincontainer" style={{height : "100%", overflowY : "auto", marginBottom : "10px"}}>
            <Router>
                <Switch>
                    <Route exact path={baseUrl} component={Main} />
                    <Route path={baseUrl+"book"} component={Book} />
                </Switch>
            </Router>
            </div>
        </div>
    )
}

export default Index;