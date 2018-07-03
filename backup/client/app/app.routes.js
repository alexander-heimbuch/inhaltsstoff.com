import { RouterModule } from '@angular/router';

// Components
export const routes = [{
  path: 'category', loadChildren: () => new Promise((resolve) => {
    require.ensure([], (require) =>
      resolve(require('components/category')['CategoryModule'])
    );
  })
}, {
  path: 'article', loadChildren: () => new Promise((resolve) => {
    require.ensure([], (require) =>
      resolve(require('components/article')['ArticleModule'])
    );
  })
}, {
  path: 'page', loadChildren: () => new Promise((resolve) => {
    require.ensure([], (require) =>
      resolve(require('components/page')['PageModule'])
    );
  })
}, {
  path: '', loadChildren: () => new Promise((resolve) => {
    require.ensure([], (require) =>
      resolve(require('components/home')['HomeModule'])
    );
  }),
  pathMatch: 'full'
}, {
  path: '**', redirectTo: ''
}];

export const appRouter = RouterModule.forRoot(routes, {
  useHash: true
});
