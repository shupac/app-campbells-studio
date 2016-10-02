import angular from 'angular';
import component from './register.component';

export default angular.module('app.register', [])
    .directive('appRegister', component);
