// Angular dependencies
import { Component } from '@angular/core';

// Services
import { StateService } from 'services/state';
import { ContentService } from 'services/content';


// Template
import html from './navigation.html';
import './navigation.scss';

@Component({
  selector: 'nav',
  template: html
})
export class NavigationComponent {
  constructor(state: StateService, content: ContentService) {
    this.state = state;
    this.content = content;
    this.navigation = state.data.header.navigation;

    this.nav = {
      categories: [],
      pages: []
    };
  }

  ngOnInit() {
    this.postsStructure(this.navigation.main, this.nav.categories);
    this.pagesStructure(this.nav.pages);
  }

  postsStructure(mainCategories, structure) {
    const add = entry => category => {
      let cat = entry.entries.filter(elem => elem.name === category);

      if (cat.length === 0) {
        entry.entries.push({
          name: category,
          count: 1
        });
      } else {
        cat[0].count += 1;
      }
    };

    mainCategories.forEach(mainCat => {
      let entry = {
        name: mainCat,
        entries: []
      };

      this.content._meta(this.content._request('posts.json'))
        .filter(this.content._filter('categories', mainCat))
        .subscribe(post => {
          post.categories
              .filter(category => !~mainCategories.indexOf(category))
              .map(add(entry));
        },
        error => console.log(error),
        () => entry.entries.length && structure.push(entry)
        );
    });
  }

  pagesStructure(structure) {
    this.content._meta(this.content._request('pages.json'))
      .subscribe(page => structure.push({
        name: page.name,
        title: page.title,
      }));
  }

  toggleMenu() {
    this.state.change('header.navigation.open', !this.navigation.open);
  }
}
