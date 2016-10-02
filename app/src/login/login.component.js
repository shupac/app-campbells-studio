import template from './login.template.html';
import controller from './login.controller'
import './login.styl';

export default function() {
    return {
        template,
        controller,
        restrict: 'E'
    };
};
