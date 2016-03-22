import { Component, Input, provide, ElementRef } from '@angular/core';
import { Location } from '@angular/common';
import { DOCUMENT } from '@angular/platform-browser';

@Component({
  selector: 'disqus',
  template: '<div id="disqus_thread"></div>',
  providers: [provide(Window, { useValue: window })]
})

export class DisqusComponent {

    constructor(location: Location, ref: ElementRef, window: Window) {
        this.location = location;
        this.ref = ref.nativeElement;
        this.window = window;

        this.identifier = 'test';
        this.shortname = 'inhaltsstoffcom';
    }

    ngOnInit() {
        if (this.window.DISQUS !== undefined) {
            return this._reset();
        }

        return this._addScriptTag();
    }

    _addScriptTag() {
        let script = document.createElement('script');

        this.window.disqus_config = this._getConfig();

        script.src = `//${this.shortname}.disqus.com/embed.js`;
        script.async = true;
        script.type = 'text/javascript';
        script.setAttribute('data-timestamp', new Date().getTime().toString());

        this.ref.appendChild(script);
    }

    _getConfig() {
        let self = this;

        return function () {
            this.page.url = self.location.path();
            this.page.identifier = self.identifier;
            this.language = 'de';
        };
    }

    _reset() {
        this.window.DISQUS.reset({
            reload: true,
            config: this._getConfig()
        });
    }
}
