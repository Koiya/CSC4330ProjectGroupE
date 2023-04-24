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
    getName: function(){
        const name =  sessionStorage.getItem('name');
        if(!name || name ==='undefined'){
            return null;
        } else{
            return JSON.parse(name);
        }
    },
    getId: function(){
        const ID =  sessionStorage.getItem('id');
        if(!ID || ID ==='undefined'){
            return null;
        } else{
            return JSON.parse(ID);
        }
    },
    setUserSession: function(user, token, role,name,id){
        sessionStorage.setItem('user', JSON.stringify(user));
        sessionStorage.setItem('token', token);
        sessionStorage.setItem('role', JSON.stringify(role));
        sessionStorage.setItem('name', JSON.stringify(name));
        sessionStorage.setItem('id', JSON.stringify(id));
    },
    resetUserSession: function(){
        sessionStorage.removeItem('user');
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('role');
        sessionStorage.removeItem('name');
        sessionStorage.removeItem('id');
    }
}