function config($stateProvider, $urlRouterProvider, $mdIconProvider, $locationProvider) {
    'ngInject'

    $urlRouterProvider.otherwise('/');

    $mdIconProvider
        .icon('back', 'app/images/arrow-left.svg')
        .icon('edit', 'app/images/pencil-box.svg')
        .icon('save', 'app/images/content-save.svg')
        .icon('menu', 'app/images/dots-vertical.svg')

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
            url: '/profile/:studentId',
            template: '<app-profile></app-profile>',
            resolve:{
               studentData: ['$stateParams', function($stateParams){
                   return $stateParams.studentData;
               }]
            },
            data: { protect: true }
        })
        .state('register', {
            url: '/register',
            template: '<app-register></app-register>',
            data: { protect: false }
        })
}

export default config;
