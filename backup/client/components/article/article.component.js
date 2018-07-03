// Angular dependencies
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Pipes
import { DateFormatPipe } from 'angular2-moment';

// Directives
import { CategoryListComponent } from 'shared/category-list/category-list';
import { CategoryColorDirective } from 'shared/category-color/category-color';
import { PreloaderDirective } from 'shared/preloader/preloader';
import { ErrorDirective } from 'shared/error/error';

// Services
import { StateService } from 'services/state';
import { ContentService } from 'services/content';

// Template
import html from './article.html';
import './article.scss';

@Component({
	selector: 'main',
  template: html,
  pipes: [ DateFormatPipe ],
  directives: [ CategoryListComponent, CategoryColorDirective, PreloaderDirective, ErrorDirective ],
	providers: [ Title ]
})
export class ArticleComponent {
  constructor(state: StateService, content: ContentService, route: ActivatedRoute, title: Title) {
    this.content = content;
    this.state = state;
    this.title = title;

    route.params.subscribe(params => {this.name = params['name'];});

    this.errorMessage = `Der Artikel mit der id "${this.name}" konnte nicht gefunden werden`;
  }

  ngOnInit() {
    this.state.change('header.size.small', true);
    this.state.change('header.navigation.open', false);
    this.loaded = false;

    this.content.posts('name', this.name)
      .subscribe(article => {
        this.article = article;

        this.title.setTitle(`${this.state.data.site.title} - ${this.article.title}`);

        this.state.change('content.categories', this.article.categories);
      }, undefined, () => {this.loaded = true;});
  }
}
