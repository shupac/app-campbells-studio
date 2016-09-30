import template from './home.template.html';
import controller from './home.controller'
import './home.styl';

export default function() {
    return {
        template,
        controller,
        restrict: 'E'
    };
};
