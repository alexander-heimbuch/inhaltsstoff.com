// Angular Dependencies
import { Component } from '@angular/core';

// Services
import { StateService } from 'services/state';

// Components
import { HeaderComponent } from 'components/header';

// Template
import html from './app.html';

// Style
import './app.scss';

@Component({
  selector: '#app',
  template: html,
  directives: [ HeaderComponent ]
})
export class AppComponent {
  constructor(state: StateService) {
    this.state = state;
  }
}
