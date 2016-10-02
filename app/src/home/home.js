import angular from 'angular';
import component from './home.component';
import nameFilter from './name.filter';

export default angular.module('app.home', [])
    .directive('appHome', component)
    .filter('nameFilter', nameFilter);
