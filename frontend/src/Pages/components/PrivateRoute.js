import React from 'react';
import {Navigate}  from 'react-router-dom';
import {getToken,getRole} from './auth';

function PrivateRouteRole({ children }) {
    const role = getRole();
    const auth = getToken();
    return auth ? <>{children}</> : <Navigate to="/login" />;
}
function PrivateRoute({ children }) {
    const auth = getToken();
    return auth ? <>{children}</> : <Navigate to="/login" />;
}
export default PrivateRoute;