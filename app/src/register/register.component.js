import template from './register.template.html';
import controller from './register.controller'
import './register.styl';

export default function() {
    return {
        template,
        controller,
        restrict: 'E'
    };
};
