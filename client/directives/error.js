// Angular dependencies
import { Directive, Input } from '@angular/core';

// Services
import { StateService } from 'services/state';

// Styles
import './error.scss';


@Directive({
    selector: '.error',
    template: `<h2 class="headline-large">Whoops</h2>
                <h3 class="headline-small error-msg">{{message}}</h3>`
})
export class ErrorDirective {
    @Input() message;
}
