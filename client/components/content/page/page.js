// Angular dependencies
import { Component } from '@angular/core';
import { RouteSegment, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';

// Services
import { StateService } from 'services/state';
import { ContentService } from 'services/content';

// Directives
import { PreloaderDirective } from 'directives/preloader';
import { ErrorDirective } from 'directives/error';

// Template
import html from './page.html';
import './page.scss';

@Component({
	selector: 'main',
    template: html,
    directives: [PreloaderDirective, ErrorDirective],
    providers: [Title]
})
export class PageComponent {
    constructor(state: StateService, content: ContentService, route: ActivatedRoute, title: Title) {
        this.content = content;
		this.state = state;
		this.route = route;
        this.title = title;

        this.errorMessage = `Die Seite mit der id "${this.name}" konnte nicht gefunden werden`;
    }

	loadPage(params) {
        this.loaded = false;
        this.page = {};

		this.content.pages('name', params.name)
			.subscribe(page => {
				this.page = page;
                this.title.setTitle(`${this.state.data.site.title} - ${this.page.title}`); 
			}, undefined, () => this.loaded = true);
    }

    ngOnInit() {
		this.state.change('header.size.small', true);
        this.state.change('header.navigation.open', false);
		this.state.change('content.categories', []);

        this.route.params.subscribe(this.loadPage.bind(this));	
    }
}
