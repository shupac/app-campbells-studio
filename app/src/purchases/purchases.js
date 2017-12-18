import angular from 'angular';
import component from './reports.component';

export default angular.module('app.reports', [])
    .directive('appReports', component);
