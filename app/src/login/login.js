import angular from 'angular';
import component from './login.component';

export default angular.module('app.login', [])
    .directive('appLogin', component)
