var LoginController = {
    onInit: function() {
    },
    onDestroy: function() {

    },
    doLogin: function(username, password) {
        $.post(Api.LOGIN, {username, password}, function(session_id){
            console.debug(session_id);
            localStorage.setItem(AppConstants.SESSION_ID_KEY, session_id);
            // after login, show the bottom navigation
            $('#bottom_navigation').fadeIn(400);
            Router.go(PagesName.HOME);
        }).fail( function(error) {
            console.debug('LoginController: doLogin method: access not granted');
            window.navigator.notification.alert('Password or username not found', function() {}, 'Login failed')
        });
    }
};