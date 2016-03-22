import { provideRouter, RouterConfig } from '@angular/router';

// Components
import { HeaderComponent } from 'components/header/header';
import { HomeComponent } from 'components/content/home/home';
import { CategoryComponent } from 'components/content/category/category';
import { ArticleComponent } from 'components/content/article/article';
import { PageComponent } from 'components/content/page/page';

export const routes = [
  { path: 'category/:main/:cat', component: CategoryComponent, name: 'Category' },
  { path: 'category/:main', component: CategoryComponent, name: 'Category' },
  { path: 'article/:name', component: ArticleComponent, name: 'Article' },
  { path: 'page/:name', component: PageComponent, name: 'Page' },
  { path: 'category', redirectTo: '' },
  { path: 'article', redirectTo: '' },
  { path: '', component: HomeComponent, name: 'Home', terminal: true },
  { path: '**', redirectTo: '' }
];

export const APP_ROUTER_PROVIDERS = [provideRouter(routes)];
