import React from 'react';
import {Navigate} from 'react-router-dom';
import {getToken,getRole} from './auth';

export const TutorRoute = ({ children }) => {
    const role = getRole();
    const auth = getToken();
    return auth && role === 'tutor' ? <>{children}</> : <Navigate to="/" />;
}
export const AdminRoute = ({ children }) => {
    const role = getRole();
    const auth = getToken();
    return auth && role === 'admin' ? <>{children}</> : <Navigate to="/" />;
}
export const PrivateRoute = ({ children }) => {
    const auth = getToken();
    return auth ? <>{children}</> : <Navigate to="/login" />;
}

