// 3rd party libs
import { lowerCase } from 'lodash';

// Angular dependencies
import { Directive, Input, ElementRef } from '@angular/core';

// Style
import './category-color.scss';

let categoryColors = {};

@Directive({
    selector: '[category-color]'
})
export class CategoryColorDirective {
    @Input() categories;

    constructor(_element: ElementRef) {
		this.element = _element.nativeElement;
    }

	ngOnChanges(changes) {
		if (JSON.stringify(changes.categories.currentValue) === JSON.stringify(changes.categories.previousValue)) {
			return;
		}

		this._render();
	}

	_render() {
		this.elementClasses = this.element.className.split(' ');

		if (this.categories.length === 0) {
			this.element.className = this.elementClasses
				.filter((className) => !className.includes('content-')).join(' ');
		} else {
			this.element.className = this.categories
				.map(category => 'content-' + lowerCase(category))
				.concat(this.elementClasses).join(' ');
		}
	}
}
