import React from 'react';
import {Navigate}  from 'react-router-dom';
import {getToken} from './auth';

function PublicRoute({ children }) {
    const auth = getToken();
    return !auth ? <>{children}</> : <Navigate to="/" />;
}
export default PublicRoute;