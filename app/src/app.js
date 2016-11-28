import angular from 'angular';
import ngMaterial from 'angular-material';
import uiRouter from 'angular-ui-router';
import config from './main/app.config';
import run from './main/app.run';
import appController from './main/app.controller';
import firebaseFactory from './main/firebase.factory';
import studentsData from './main/studentsData.factory';
import './main/app.styl';

import login from './login/login';
import admin from './admin/admin';
import home from './home/home';
import profile from './profile/profile';
import register from './register/register';
import reports from './reports/reports';

angular.module('app',
    [
        ngMaterial,
        uiRouter,
        login.name,
        admin.name,
        home.name,
        profile.name,
        register.name,
        reports.name
    ])
    .factory('firebaseFactory', firebaseFactory)
    .factory('studentsData', studentsData)
    .controller('appController', appController)
    .config(config)
    .run(run);
