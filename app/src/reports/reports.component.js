import template from './reports.template.html';
import controller from './reports.controller'
import './reports.styl';

export default function() {
    return {
        template,
        controller,
        restrict: 'E'
    };
};
