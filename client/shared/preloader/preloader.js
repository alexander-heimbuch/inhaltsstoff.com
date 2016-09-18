// 3rd party libs
import { lowerCase } from 'lodash';

// Angular dependencies
import { Directive, Input, ElementRef } from '@angular/core';

// Style
import './preloader.scss';


@Directive({
    selector: '.preloader',
    template: `<div class="loading-animation">
            <div class="loading-animation-wrapper">
                <ul class="loading-animation-dots">
                    <li></li>
                    <li></li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        </div>`,
    host: {
        '[class.loaded]': 'loaded',
        '[class.hide]': 'hide'
    }
})
export class PreloaderDirective {
    @Input() loaded;

    ngOnChanges(changes) {
        this.hide = false;

        if (this.loaded === false) {
            return;
        }

        setTimeout(() => this.hide = true, 400);
    }
}
