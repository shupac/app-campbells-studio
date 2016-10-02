import template from './admin.template.html';
import controller from './admin.controller'
import './admin.styl';

export default function() {
    return {
        template,
        controller,
        restrict: 'E'
    };
};
