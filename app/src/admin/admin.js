import angular from 'angular';
import component from './admin.component';

export default angular.module('app.admin', [])
    .directive('appAdmin', component)
