var AddFriendController = {
    fetchUsers: function() {

    },
    followUser: function(username) {
        var session_id = localStorage.getItem( AppConstants.SESSION_ID_KEY );

        $.get(Api.FOLLOW + '?session_id=' + session_id + '&username=' + username, function(results){
            console.debug('AddFriendController: followUser method: ', results);
            $('#autocomplete_users').val('');
            navigator.notification.alert("You are now following " + username);
        }).fail( function(error) {
            console.debug('AddFriendController: followUser method: ', error);
            navigator.notification.alert(error.responseText || 'Could not follow this user');
        });
    },
    initialize: function() {
        var session_id = localStorage.getItem(AppConstants.SESSION_ID_KEY);

        var options = {
            url: function(phrase) {
                return Api.USERS + '?session_id=' + session_id + '&limit=10&usernamestart=' + phrase;
            },
            list: {
                match: {
                    enabled: true
                }
            },
            listLocation: "usernames",
            requestDelay: 400
        };

        $("#autocomplete_users").easyAutocomplete(options);
    }
};