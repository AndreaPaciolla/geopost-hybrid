var Router = {
    go: function(pageId) {
        if( location.hash === pageId ) {
            return;
        }
        location.hash = pageId;
        // after the hash has changed, adapt the view
        Router.hideAllExcept(pageId);
        Router.callInitMethod(pageId);
    },
    hideAllExcept: function(pageId) {
        Pages.forEach( function(pageObj) {
            if(pageId !== pageObj.name) {
                $('#'+pageObj.name).fadeOut(50);
                Router.callDestroyMethod(pageObj.name);
            }
            if(pageId === pageObj.name) $('#'+pageObj.name).fadeIn(500);
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