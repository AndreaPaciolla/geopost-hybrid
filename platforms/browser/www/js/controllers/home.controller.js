var HomeController = {
    // Reference to friends
    friends: [],
    // Reference to the google map
    googleMap: undefined,
    // initial call to get friends' positions
    fetchFriends: function() {
        var session_id = localStorage.getItem(AppConstants.SESSION_ID_KEY);
        $.get(Api.FOLLOWED + '?session_id='+session_id, function(friends){
            console.debug(friends);
            // Store the information
            HomeController.friends = friends.followed;
            HomeController.addMarkers(friends.followed);
            HomeController.initListView();
        }).fail( function(error) {
            console.debug('LoginController: doLogin method: access not granted');
            $('#alert-login').removeClass('invisible');
            setTimeout( function() {
                $('#alert-login').addClass('invisible');
            }, 2500);
        });
    },
    initListView: function() {
        // compute distance from me
        if( LocalizationService.currentPosition ) {

            var friendsWithPosition = HomeController.friends.filter( function(friend) {
                return !!friend.lat && !!friend.lon;
            });

            var friendsWithoutPosition = HomeController.friends.filter( function(friend) {
                return friend.lat == undefined || friend.lat == null;
            });

            friendsWithPosition.forEach( function(friend) {
                // if the user has defined geolocation...
                friend.distanceFromMe = undefined;
                if( friend.lat && friend.lon ) {
                    var p1 = new google.maps.LatLng(friend.lat, friend.lon);
                    var p2 = new google.maps.LatLng(LocalizationService.currentPosition.latitude, LocalizationService.currentPosition.longitude);
                    friend.distanceFromMe = HomeController.calcDistance(p1, p2);
                }
            });
            friendsWithPosition.sort( function(f1, f2) {
                if (f1.distanceFromMe < f2.distanceFromMe)
                    return -1;
                if (f1.distanceFromMe > f2.distanceFromMe)
                    return 1;
                return 0;
            });

            HomeController.friends = friendsWithPosition.concat(friendsWithoutPosition);

            HomeController.fillFollowedList();
        } else {
            HomeController.fillFollowedList();
        }

    },
    fillFollowedList: function() {
        HomeController.friends.forEach( function(friend) {
            if(friend.distanceFromMe) {
                $('#followed_list').append('<li class="list-group-item"><span class="badge">'+ friend.distanceFromMe +' km</span><h5><strong>'+ friend.username +'</strong></h5>'+ friend.msg +'</li>');
            } else {
                $('#followed_list').append('<li class="list-group-item"><span class="badge">N.D.</span><h5><strong>'+ friend.username +'</strong></h5>'+ friend.msg +'</li>');
            }
        });
    },
    initMap: function() {
        var milan = {lat: 35.9197885, lng: -88.7589488};
        HomeController.googleMap = new google.maps.Map(document.getElementById('map'), {
            zoom: 7,
            center: milan
        });
    },
    onInit: function() {
        HomeController.initMap();
        HomeController.fetchFriends();
    },
    onDestroy: function() {
        $('#followed_list').html('');
        HomeController.friends = [];
        HomeController.googleMap = undefined;
    },
    //calculates distance between two points in km's
    calcDistance: function(p1, p2) {
        return parseFloat((google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2));
    },
    addMarkers: function(persons) {
        var bounds = new google.maps.LatLngBounds();

        if( Array.isArray(persons) ) {

            // Add my position, if available
            if( LocalizationService.currentPosition ) {
                var beachMarker = new google.maps.Marker({
                    position: {lat: LocalizationService.currentPosition.latitude, lng: LocalizationService.currentPosition.longitude},
                    map: HomeController.googleMap,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    title: 'My position'
                });
            }

            persons.forEach( function(friend) {
                // Add friend only if they provided their position. Avoid null pointer exceptions
                if(friend.lat && friend.lon) {

                    var friendMessage = friend.msg || 'No message.';
                    var infoWindowContent = '<h6>'+friend.username+'</h6><p>'+friendMessage+'</p>';

                    var marker = new google.maps.Marker({
                        position: {lat: friend.lat, lng: friend.lon},
                        map: HomeController.googleMap
                    });
                    var infoWindow = new google.maps.InfoWindow({
                        content: infoWindowContent
                    });
                    marker.addListener('click', function() {
                        infoWindow.open(HomeController.googleMap, marker);
                    });

                    bounds.extend(marker.getPosition());

                }

            });

            // center the map's camera
            HomeController.googleMap.fitBounds( bounds );
        }
    }
}
