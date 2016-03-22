// Angular dependencies
import { Component, Inject } from '@angular/core';

// Services
import { StateService } from 'services/state';

// Directives
import { NavigationComponent } from './navigation/navigation';

// Template
import html from './header.html';
import './header.scss';

@Component({
    selector: 'header',
    template: html,
    directives: [NavigationComponent],
    host: {
        '[class.small-header]': 'state.data.header.size.small',
        '[class.big-header]': '!state.data.header.size.small',
        '[class.navigation-open]': 'state.data.header.navigation.open',
        '[class.navigation-closed]': '!state.data.header.navigation.open'
    }
})
export class HeaderComponent {
    constructor(state: StateService) {
        this.state = state;
    }
}
