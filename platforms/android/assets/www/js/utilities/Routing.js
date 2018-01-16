var Router = {
    go: function(pageId) {
        if( location.hash === pageId ) {
            return;
        }
        location.hash = pageId;
        // after the hash has changed, adapt the view
        Router.hideAllExcept(pageId);
        // this call needs to be moved inside the hideAllExcept method
        // Router.callInitMethod(pageId);
    },
    hideAllExcept: function(pageId) {
        Pages.forEach( function(pageObj) {
            if(pageId !== pageObj.name) {
                $('#'+pageObj.name).fadeOut(50);
                Router.callDestroyMethod(pageObj.name);
            }
            // Dynamic page-content loading bades upon routes
            if(pageId === pageObj.name) {
                // Load the page content
                $("body > main").load('../views/'+ pageObj.name + ".html", function(responseTxt, statusTxt, xhr){
                    // Show the content loaded
                    $('#'+pageObj.name).fadeIn(500);

                    // Call the init method of the controller for that page
                    Router.callInitMethod(pageId);

                    if(statusTxt == "success")
                        console.log("External content loaded successfully!");
                    if(statusTxt == "error")
                        console.log("Error: " + xhr.status + ": " + xhr.statusText);
                });
            }
        })
    },
    callInitMethod: function(pageId) {
        switch(pageId) {
            case PagesName.HOME:
                HomeController.onInit();
                break;
            case PagesName.ADD_FRIEND:
                AddFriendController.onInit();
                break;
            case PagesName.STATE:
                UpdateStateController.onInit();
                break;
            case PagesName.PROFILE:
                ProfileController.onInit();
                break;
            case PagesName.LOGIN:
                LoginController.onInit();
                break;
        }
    },
    callDestroyMethod: function(pageId) {
        switch(pageId) {
            case PagesName.HOME:
                HomeController.onDestroy();
                break;
            case PagesName.ADD_FRIEND:
                AddFriendController.onDestroy();
                break;
            case PagesName.STATE:
                UpdateStateController.onDestroy();
                break;
            case PagesName.PROFILE:
                ProfileController.onDestroy();
                break;
        }
    }
}