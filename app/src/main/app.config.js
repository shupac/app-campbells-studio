function config($stateProvider, $urlRouterProvider, $locationProvider) {
    'ngInject'

    $urlRouterProvider.otherwise('/');
    // $locationProvider.html5Mode(true);

    $stateProvider
        .state('home', {
            url: '/',
            template: '<app-home></app-home>',
            data: { protect: true }
        })
        .state('login', {
            url: '/login',
            template: '<app-login></app-login>',
            data: { protect: false }
        })
        .state('profile', {
            url: '/profile',
            params: {
                userId: null
            },
            template: '<app-profile></app-profile>',
            data: { protect: true }
        })
}

export default config;
