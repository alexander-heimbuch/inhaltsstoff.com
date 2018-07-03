// Angular dependencies
import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

// Services
import { StateService } from 'services/state';
import { ContentService } from 'services/content';

// Directives
import { SlicesComponent } from 'shared/slices/slices';
import { PreloaderDirective } from 'shared/preloader/preloader';

// Template
import html from './home.html';

@Component({
    selector: 'main',
    template: html,
    providers: [ StateService ],
    directives: [ SlicesComponent, PreloaderDirective ],
    providers: [ Title ]
})
export class HomeComponent {
  constructor(state: StateService, content: ContentService, title: Title) {
    this.state = state;
    this.content = content;
    this.title = title;

    this.articles = [];
  }

  ngOnInit() {
    this.state.change('header.size.small', false);
    this.state.change('header.navigation.open', false);
    this.state.change('content.categories', []);

    this.loaded = false;

    this.title.setTitle(this.state.data.site.title);

    this.content.posts()
      .take(5)
      .subscribe(post => this.articles.push(post), undefined, () => {this.loaded = true;});
  }
}
