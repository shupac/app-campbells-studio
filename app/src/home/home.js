import angular from 'angular';
import component from './home.component';

export default angular.module('app.home', [])
    .directive('appHome', component);
