// Angular dependencies
import { Component, Input } from '@angular/core';

// Pipes
import { DateFormatPipe } from 'angular2-moment';

// Directives
import {CategoryListComponent} from 'directives/category-list';
import {CategoryColorDirective} from 'directives/category-color';

// Template
import html from './slices.html';

// Styles
import './slices.scss';

@Component({
    selector: '.slices',
    template: html,
	pipes: [DateFormatPipe],
    directives: [CategoryListComponent, CategoryColorDirective]
})
export class Slices {
    @Input() articles;
}
