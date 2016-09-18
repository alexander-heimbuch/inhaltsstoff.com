import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from 'shared';

// Components
import { ArticleComponent } from './article.component';

const routes = [{ path: ':name', component: ArticleComponent }];

@NgModule({
  declarations: [ ArticleComponent ],
  imports: [ RouterModule.forChild(routes), SharedModule, CommonModule ]
})
export class ArticleModule {}
