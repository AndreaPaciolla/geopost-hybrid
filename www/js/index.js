/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);

        // detach the listener
        screen.orientation.onchange = app.setMaximumViewportHeight();
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        app.setMaximumViewportHeight();
        if( AuthService.isAuthenticated() ) {
            // make the bottom navigation menu visible
            $('#bottom_navigation').fadeIn(400);
            // go to the app homepage
            Router.go(PagesName.HOME);
        }
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        console.log('Received Event: ' + id);
    },
    setMaximumViewportHeight: function() {
        if(location.hash === '#'+PagesName.LOGIN || location.hash === '') {
            $('.container-fluid').css('height', $(window).height());
            $('.container-fluid').css('max-height', '');
            $('.container-fluid').css('overflow-y', '');
        } else {
            $('.container-fluid').css('max-height', $(window).height() - 60).css('overflow-y', 'scroll');
            $('.container-fluid').css('height', '');
        }
    }
};


// initialize the application
app.initialize();