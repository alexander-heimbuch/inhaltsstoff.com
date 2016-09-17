import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import { CategoryComponent } from './category.component';

// Modules
import { SharedModule } from 'shared';

const routes = [{
  path: ':main', component: CategoryComponent
}, {
  path: ':main/:cat', component: CategoryComponent
}];

@NgModule({
  declarations: [CategoryComponent],
  imports: [RouterModule.forChild(routes), SharedModule, CommonModule]
})
export class CategoryModule {}
