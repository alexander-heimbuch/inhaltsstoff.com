// Angular dependencies
import { Component, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Directives
import { Slices } from '../slices/slices';
import { PreloaderDirective } from 'directives/preloader';
import { ErrorDirective } from 'directives/error';

// Services
import { StateService } from 'services/state';
import { ContentService } from 'services/content';

// Template
import html from './category.html';

@Component({
    selector: 'main',
    template: html,
    providers: [StateService, Title],
    directives: [Slices, PreloaderDirective, ErrorDirective]
})

export class CategoryComponent {
    constructor(state: StateService, content: ContentService, route: ActivatedRoute, title: Title) {
        this.state = state;
		this.content = content;
        this.route = route;
        this.title = title;

        this.errorMessage = 'Die Kategorie konnte leider nicht gefunden werden';
    }

    loadPosts(params) {
        let categories = Object.keys(params).map(name => params[name]).join(', ');

        this.loaded = false;
        this.articles = [];
        
        this.title.setTitle(`${this.state.data.site.title} - ${categories}`);

        this.content.posts('categories', (result) => {
            let main = true;
            let category = true;

            if (params.main !== undefined) {
                main = ~result.indexOf(params.main);
            }

            if (params.category !== undefined) {
                category = ~result.indexOf(params.category);
            }

            return main && category
		})
		.take(8)
		.subscribe(post => this.articles.push(post), undefined, () => this.loaded = true)
    }

    ngOnInit() {
        this.state.change('header.size.small', true);
        this.state.change('header.navigation.open', false);
		this.state.change('content.categories', []);

        this.route.params.subscribe(this.loadPosts.bind(this));	
    }
}
