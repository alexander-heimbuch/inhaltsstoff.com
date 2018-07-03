// Angular dependencies
import { Component, Input } from '@angular/core';

// Pipes
import { DateFormatPipe } from 'angular2-moment';

// Directives
import { CategoryListComponent } from 'shared/category-list/category-list';
import { CategoryColorDirective } from 'shared/category-color/category-color';

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
export class SlicesComponent {
    @Input() articles;
}
