import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = ({component: Component, ...rest}) => {
    const auth = useSelector((state) => state.firebase.auth.isEmpty);
    return (

        // Show the component only when the user is logged in
        // Otherwise, redirect the user to /signin page
        <Route {...rest} render={props => (
            !auth ?
                <Component {...props} />
            : <Redirect to="/CCP-Login" />
        )} />
    );
};

export default PrivateRoute;