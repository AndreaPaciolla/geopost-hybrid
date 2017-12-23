var Router = {
    go: function(pageId) {
        if( location.hash === pageId ) {
            return;
        }
        location.hash = pageId;
        Router.hideAllExcept(pageId);
        Router.callInitMethod(pageId);
    },
    hideAllExcept: function(pageId) {
        Pages.forEach( function(pageObj) {
            if(pageId !== pageObj.name) $('#'+pageObj.name).fadeOut();
            if(pageId === pageObj.name) $('#'+pageObj.name).fadeIn();
        })
    },
    callInitMethod: function(pageId) {
        switch(pageId) {
            case PagesName.HOME:
                HomeController.initialize();
                break;
            case PagesName.ADD_FRIEND:
                AddFriendController.initialize();
                break;
            case PagesName.STATE:
                UpdateStateController.initialize();
                break;
            case PagesName.PROFILE:
                ProfileController.initialize();
                break;
        }
    }
}