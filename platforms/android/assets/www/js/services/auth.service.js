var AuthService = {
    isAuthenticated: function() {
        if( localStorage.getItem(AppConstants.SESSION_ID_KEY) !== null ) {
            return true;
        }
        return false;
    }
}