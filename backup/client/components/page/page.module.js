import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Modules
import { SharedModule } from 'shared';

// Components
import { PageComponent } from './page.component';

const routes = [{ path: ':name', component: PageComponent }];

@NgModule({
  declarations: [PageComponent],
  imports: [RouterModule.forChild(routes), SharedModule, CommonModule]
})
export class PageModule {}
