import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

// Pipes
import { DateFormatPipe } from 'angular2-moment';

// Global Services
import { StateService } from 'services/state';
import { ContentService } from 'services/content';

// Directives
import { CategoryColorDirective } from './category-color/category-color';
import { CategoryListComponent } from './category-list/category-list';
import { ErrorDirective } from './error/error';
import { PreloaderDirective } from './preloader/preloader';
import { SlicesComponent } from './slices/slices';

const shared = [
  CategoryColorDirective,
  CategoryListComponent,
  ErrorDirective,
  PreloaderDirective,
  SlicesComponent,
  DateFormatPipe
];

@NgModule({
  declarations: [ shared ],
  imports: [ RouterModule, CommonModule],
  exports: [ shared ],
  providers: [ StateService, ContentService ]
})
export class SharedModule {}
