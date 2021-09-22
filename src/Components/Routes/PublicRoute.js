import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PublicRoute = ({component: Component, ...rest}) => {
    return (
        <Route {...rest} render={props => true ? <Component {...props} /> : <Redirect to='/Home' />} />
    );
};

export default PublicRoute;