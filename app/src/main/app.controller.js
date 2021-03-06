function AppController($scope, $rootScope, $state) {
    'ngInject'

    var keys = {37: 1, 38: 1, 39: 1, 40: 1};

    function preventDefault(e) {
      e = e || window.event;
      if (e.preventDefault)
          e.preventDefault();
      e.returnValue = false;
    }

    function preventDefaultForScrollKeys(e) {
        if (keys[e.keyCode]) {
            preventDefault(e);
            return false;
        }
    }

    function disableScroll() {
      if (window.addEventListener) // older FF
          window.addEventListener('DOMMouseScroll', preventDefault, false);
      window.onwheel = preventDefault; // modern standard
      window.onmousewheel = document.onmousewheel = preventDefault; // older browsers, IE
      window.ontouchmove  = preventDefault; // mobile
      document.onkeydown  = preventDefaultForScrollKeys;
    }

    function enableScroll() {
        if (window.removeEventListener)
            window.removeEventListener('DOMMouseScroll', preventDefault, false);
        window.onmousewheel = document.onmousewheel = null;
        window.onwheel = null;
        window.ontouchmove = null;
        document.onkeydown = null;
    }

    $scope.startProgress = function() {
        $rootScope.showProgress = true;
        disableScroll();
    };

    $scope.stopProgress = function() {
        $rootScope.showProgress = false;
        enableScroll();
    };

    $rootScope.resumeRoute = function() {
      if ($rootScope.returnState) {
        $state.go($rootScope.returnState, $rootScope.returnParams);
        $rootScope.returnState = null;
      } else {
        $state.go('home');
      }
    };
}

export default AppController;
