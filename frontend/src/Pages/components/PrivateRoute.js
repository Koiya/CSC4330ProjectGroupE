import React from 'react';
import {Navigate}  from 'react-router-dom';
import {getToken,getRole} from './auth';

export const PrivateRouteRole = ({ children }) => {
    const role = getRole();
    const auth = getToken();
    if(role === 'tutor'){
        return auth && role === 'tutor' ? <>{children}</> : <Navigate to="/login" />;
    }
    if(role === 'admin'){
        return auth && role === 'admin' ? <>{children}</> : <Navigate to="/login" />;
    }
}

export const PrivateRoute = ({ children }) => {
    const auth = getToken();
    return auth ? <>{children}</> : <Navigate to="/login" />;
}

