var ProfileController = {
    // Reference to map profile
    googleMap: undefined,
    initialize: function() {
        var session_id = localStorage.getItem( AppConstants.SESSION_ID_KEY );

        $.get(Api.PROFILE + '?session_id=' + session_id, function(profile){
            console.log('ProfileController: initialize method: ', profile);
            // Setup the view
            $('#profileUsername').html(profile.username);
            $('#profileLastState').html(profile.msg);
            // Setup the map
            ProfileController.googleMap = new google.maps.Map(document.getElementsByClassName('map_profile')[0], {
                zoom: 15,
                center: {lat: profile.lat, lng: profile.lon}
            });
            // Add my position, if available
            if( LocalizationService.currentPosition ) {
                var image = '../img/myposition.png';
                var beachMarker = new google.maps.Marker({
                    position: {lat: LocalizationService.currentPosition.latitude, lng: LocalizationService.currentPosition.longitude},
                    map: ProfileController.googleMap,
                    icon: image,
                    title: 'My position'
                });
            }
        }).fail( function(error) {
            console.log('ProfileController: initialize method: ', error);
            navigator.notification.alert(error.responseText || 'Could not initialize the profile.');
        });
    },
    logout: function() {
        var session_id = localStorage.getItem( AppConstants.SESSION_ID_KEY );

        $.get(Api.LOGOUT + '?session_id=' + session_id, function(results){
            console.log('ProfileController: logout method: ', results);
            // erase the localstorage
            localStorage.clear();
            // Greeting the user
            navigator.notification.alert('Goodbye');
            // Go to the login page
            Router.go(PagesName.LOGIN);
        }).fail( function(error) {
            console.log('ProfileController: logout method: ', error);
            navigator.notification.alert(error.responseText || 'Could not do the logout');
        });
    }
}