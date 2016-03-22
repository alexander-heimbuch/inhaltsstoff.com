// Bootstrapping
import './shim';
import { bootstrap } from '@angular/platform-browser-dynamic';
import { provide, enableProdMode, PLATFORM_DIRECTIVES } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { Location, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { HTTP_PROVIDERS } from '@angular/http';

// Components
import { AppComponent } from './components/app/app';
import { APP_ROUTER_PROVIDERS } from './components/app/app.routes';

// Global Services
import { StateService } from './services/state';
import { ContentService } from './services/content';

// Styles
import './root.scss';

enableProdMode();

bootstrap(AppComponent, [
    APP_ROUTER_PROVIDERS ,
    HTTP_PROVIDERS, // Providers
	StateService, ContentService, // Services
    {provide: PLATFORM_DIRECTIVES, useValue: ROUTER_DIRECTIVES, multi: true},
    {provide: LocationStrategy, useClass: HashLocationStrategy}
]);
