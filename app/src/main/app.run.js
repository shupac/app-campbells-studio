function run($rootScope, $state, firebaseFactory) {
    'ngInject'
    // $state.go('profile');
    // $state.go('profile', {userId: 'shu'});

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams) {
        if (!firebaseFactory.isAuth() && toState.data.protect) {
            event.preventDefault();
            $state.go('login');
            $rootScope.returnState = toState;
            $rootScope.returnParams = toParams;
        }
    });
};

export default run;
