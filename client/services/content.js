// Angular core dependencies
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import objectPath from 'object-path';
import Rx from 'rxjs/Rx';

const apiBase = 'data/';

@Injectable()
export class ContentService {
    constructor(http: Http) {
		this.http = http;
	}

	_meta(request) {
		return request
			.map(results => results.sort((a,b) => new Date(b.publish) - new Date(a.publish)))
			.map(results => Rx.Observable.from(results))
			.concatAll();
	}

	_request(route = '') {
		// TODO: implement local data storage
		return this.http.get(apiBase + route)
			.map(response => response.json())
			.catch(error => Rx.Observable.throw(new Error(error)));
	}

	_filter(attr = false, needle) {
		return entry => {
			if (!attr) {
				return true;
			}

			if (Array.isArray(entry[attr]) && typeof needle !== 'function') {
				return ~entry[attr].indexOf(needle)
			}

			if (typeof needle === 'function') {
				return needle(entry[attr]);
			}

			if (typeof entry[attr] === 'string') {
				return needle === entry[attr];
			}

			return false;
		}
	}

	posts(attr = false, needle) {
        return this._meta(this._request('posts.json'))
			.filter(this._filter(attr, needle))
			.map(entry => this._request(entry.href))
			.concatAll()
	}

	pages(attr = false, needle) {
        return this._meta(this._request('pages.json'))
			.filter(this._filter(attr, needle))
			.map(entry => this._request(entry.href))
			.concatAll()
	}
}
