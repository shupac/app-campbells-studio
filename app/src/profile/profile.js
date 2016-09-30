import angular from 'angular';
import component from './profile.component';

export default angular.module('app.profile', [])
    .directive('appProfile', component);
