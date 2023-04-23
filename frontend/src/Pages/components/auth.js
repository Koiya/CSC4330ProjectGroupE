module.exports = {
    getRole: function(){
        const role = sessionStorage.getItem('role');
        if(!role || role ==='undefined'){
            return null;
        } else{
            return JSON.parse(role);
        }
    },
    getUser: function(){
        const user = sessionStorage.getItem('user');
        if(!user || user ==='undefined'){
            return null;
        } else{
            return JSON.parse(user);
        }
    },
    getToken: function(){
        return sessionStorage.getItem('token');
    },
    setUserSession: function(user, token, role){
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', JSON.stringify(role));
    },
    resetUserSession: function(){
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
    }
}