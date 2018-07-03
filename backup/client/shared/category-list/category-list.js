// Angular dependencies
import { Component, Input } from '@angular/core';

let html = `<span *ngFor="let category of categories; let last = last">
                <a [routerLink]="['/category', category]">{{ category }}</a>
                <span *ngIf="!last">,</span>
            </span>`;

@Component({
    selector: '.category-list',
    template: html
})
export class CategoryListComponent {
    @Input() categories;
}
