import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import config from './main/app.config';
import run from './main/app.run';
import appController from './main/app.controller';
import firebaseFactory from './main/firebase.factory';
import './main/app.styl';

import components from './components/components';
import home from './home/home';
import profile from './profile/profile';
import register from './register/register';

angular.module('app',
    [
        ngMaterial,
        uiRouter,
        components.name,
        home.name,
        profile.name,
        register.name
    ])
    .factory('firebaseFactory', firebaseFactory)
    .controller('appController', appController)
    .config(config)
    .run(run);
