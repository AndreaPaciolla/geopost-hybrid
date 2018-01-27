var UserHistoryController = {
    friendUsername: undefined,
    history: [],
    initListView: function() {
        // Set the UI View
        $("#historyPage_FriendUsername").html(UserHistoryController.friendUsername);
        // Fill the messages list
        UserHistoryController.fillHistoryList(UserHistoryController.history);
    },
    fillHistoryList: function(messages) {
        // Empty the list first
        $('#history_list').html('');
        // Then populate it
        if(messages.length === 0) {
            $('#history_list').append('<li class="list-group-item"><div><strong>No old messages available</strong></div></li>');
        } else {
            messages.forEach( function(message) {
                var data = message.timestamp.match(/[0-9\-]+/)[0];
                var ora = message.timestamp.match(/[0-9]+:[0-9]+:[0-9]+/)[0];
                $('#history_list').append('<li class="list-group-item"><h5><strong>'+ message.value +'</strong></h5><div style="text-align:right"><small>'+ data + ' at ' + ora +'</small></div></li>');
            });
        }
    },
    onInit: function() {
        // Empty the list first
        $('#history_list').html('');
    },
    onDestroy: function() {
        $('#history_list').html('');
        HomeController.history = [];
    },
    setUsername: function(username) {
        console.log("UserHistoryController: initUsername method -- Got username -> " + username);
        // Store the username
        UserHistoryController.friendUsername = username;
        // Change the ui
        Router.go(PagesName.HISTORY);
        // Call the backend
        UserHistoryController.getUserHistory(username);
    },
    getUserHistory: function(username) {
        var session_id = localStorage.getItem( AppConstants.SESSION_ID_KEY );

        $.get(Api.HISTORY + '?session_id='+session_id + '&username='+ username, function(history){
            console.log("esameMC. Numero di post: " + history.history.length);
            // Store the information
            UserHistoryController.history = history.history;
            UserHistoryController.initListView();
        }).fail( function(error) {
            console.debug('UserHistoryController: getUserHistory method: history unavailable');
            navigator.notification.alert("Cannot get history for user " + username);
        });
    }
}
