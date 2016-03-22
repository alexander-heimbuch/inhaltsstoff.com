// Angular Dependencies
import { Component } from '@angular/core';

// Services
import { StateService } from 'services/state';

// Components
import { HeaderComponent } from 'components/header/header';

// Directives
import { CategoryColorDirective } from 'directives/category-color';

// Template
import html from './app.html';

// Style
import './app.scss';

@Component({
    selector: '#app',
    template: html,
    directives: [HeaderComponent, CategoryColorDirective]
})
export class AppComponent {
    constructor(state: StateService) {
        this.state = state;
    }
}
