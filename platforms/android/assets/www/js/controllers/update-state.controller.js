var UpdateStateController = {
    onInit: function() {

    },
    onDestroy: function() {

    },
    updateState: function(message) {
        var session_id = localStorage.getItem( AppConstants.SESSION_ID_KEY );
        var myPosition = LocalizationService.currentPosition;

        $.get(Api.STATUS_UPDATE + '?session_id=' + session_id + '&message=' + message + '&lat='+myPosition.latitude + '&lon=' + myPosition.longitude, function(results){
            console.debug('UpdateStateController: updateState method: ', results);
            $('#txtState').val('');
            navigator.notification.alert('State has been updated', 'Updated state');
        }).fail( function(error) {
            console.debug('UpdateStateController: updateState method: ', error);
            navigator.notification.alert(error.responseText || 'Could not update the state', 'Updating state failed.');
        });
    }
}