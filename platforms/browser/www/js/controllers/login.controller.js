var LoginController = {
    doLogin: function(username, password) {
        $.post(Api.LOGIN, {username, password}, function(session_id){
            console.debug(session_id);
            localStorage.setItem(AppConstants.SESSION_ID_KEY, session_id);
            Router.go(PagesName.HOME);
        }).fail( function(error) {
            console.debug('LoginController: doLogin method: access not granted');
            $('#alert-login').removeClass('invisible');
            setTimeout( function() {
                $('#alert-login').addClass('invisible');
            }, 2500);
        });
    }
};