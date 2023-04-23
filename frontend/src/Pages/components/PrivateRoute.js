import React from 'react';
import {Navigate}  from 'react-router-dom';
import {getToken,getRole} from './auth';

export const PrivateRouteRole = ({ children }) => {
    const role = getRole();
    const auth = getToken();
    return auth && role === 'tutor' ? <>{children}</> : <Navigate to="/login" />;
}
export const PrivateRoute = ({ children }) => {
    const auth = getToken();
    return auth ? <>{children}</> : <Navigate to="/login" />;
}

