var LocalizationService = {
    // the reference to watch id
    watchID: undefined,
    // the current position
    currentPosition: undefined,
    setCurrentPosition: function() {
        navigator.geolocation.getCurrentPosition( LocalizationService.onPositionSuccess, LocalizationService.onPositionError, {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0
        });
        // and setup a watcher
        LocalizationService.watchID = navigator.geolocation.watchPosition(LocalizationService.onPositionSuccess, LocalizationService.onPositionError, { enableHighAccuracy: true });
    },
    onPositionSuccess: function(position) {
        console.log('LocalizationService: setCurrentPosition: ', position);
        LocalizationService.currentPosition = position.coords;
        $(document).trigger(AppConstants.EVENT_POSITION_UPDATED);
    },
    onPositionError: function(error) {
        console.log('LocalizationService: setCurrentPosition: ', error);
        switch(error.code) {
            case error.PERMISSION_DENIED:
                //navigator.notification.alert("User denied the request for Geolocation.");
                break;
            case error.POSITION_UNAVAILABLE:
                console.log("Location information is unavailable.");
                break;
            case error.TIMEOUT:
                console.log("The request to get user location timed out.");
                break;
            case error.UNKNOWN_ERROR:
                navigator.notification.alert("An unknown error occurred.");
                break;
        }
    },
    handlePermission: function() {
        navigator.permissions.query({name:'geolocation'}).then(function(result) {
            if (result.state == 'granted') {
                report(result.state);
            } else if (result.state == 'prompt') {
                report(result.state);
                LocalizationService.setCurrentPosition();
            } else if (result.state == 'denied') {
                report(result.state);
            }
            result.onchange = function() {
                report(result.state);
            }
        });
    }
};

function report(state) {
    console.log('Permission ' + state);
}