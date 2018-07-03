import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

// Modules
import { SharedModule } from 'shared';

// Components
import { AppComponent } from './app.component';
import { HeaderComponent } from 'components/header';
import { NavigationComponent } from 'components/header';
import { appRouter } from './app.routes';

@NgModule({
  declarations: [ AppComponent, HeaderComponent, NavigationComponent],
  imports: [
    SharedModule, HttpModule, BrowserModule, appRouter
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
