var ProfileController = {
    // Active view
    activeView: undefined,
    // Reference to map profile
    googleMap: undefined,
    initialize: function() {
        ProfileController.switchOrientationViews();
        ProfileController.attachEventsListener();
    },
    attachEventsListener: function() {
        screen.orientation.onchange = function(){
            console.log(screen.orientation.type);
            ProfileController.switchOrientationViews();
        };
    },
    switchOrientationViews: function() {
        if(window.screen.orientation.type == "portrait" || window.screen.orientation.type === 'portrait-primary' || window.screen.orientation.type === 'portrait-secondary') {
            $('#profilePortrait').fadeIn(500);
            $('#profileLandscape').fadeOut(50);
            ProfileController.activeView = 'portrait';
        } else if(window.screen.orientation.type == "landscape-primary" || window.screen.orientation.type === 'landscape-secondary' || window.screen.orientation.type === 'landscape') {
            $('#profilePortrait').fadeOut(50);
            $('#profileLandscape').fadeIn(500);
            ProfileController.activeView = 'landscape';
        }
        ProfileController.generateView();
    },
    onDestroy: function() {

    },
    generateView: function() {
        var session_id = localStorage.getItem( AppConstants.SESSION_ID_KEY );

        $.get(Api.PROFILE + '?session_id=' + session_id, function(profile) {
            console.log('ProfileController: initialize method: ', profile);
            // Setup the view
            $('.profileUsername').html(profile.username);
            $('.profileLastState').html(profile.msg);
            // Setup the map
            var mapElm = undefined;
            if( ProfileController.activeView === 'portrait') {
                mapElm = $('#profilePortrait .map_profile');
            } else {
                mapElm = $('#profileLandscape .map_profile');
            }
            ProfileController.googleMap = new google.maps.Map(mapElm[0], {
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