import React, {Component} from "react";
import {Redirect, Route} from "react-router-dom";

const ProtectedRoute = ({component: Component, ...props}) => {
    return (
        <Route>
            {() => props.loggedIn ? <Component {...props} /> : <Redirect to="./login"/>
            }
        </Route>
    )
}

export default ProtectedRoute;