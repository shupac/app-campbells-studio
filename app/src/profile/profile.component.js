import template from './profile.template.html';
import controller from './profile.controller'
import './profile.styl';

export default function() {
    return {
        template,
        controller,
        restrict: 'E'
    };
};
