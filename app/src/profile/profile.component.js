import template from './profile.template.html';
import controller from './profile.controller'
import './profile.styl';
import './classes.styl';

export default function() {
    return {
        template,
        controller,
        restrict: 'E'
    };
};
