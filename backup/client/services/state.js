// Angular core dependencies
import {Injectable} from '@angular/core';
import objectPath from 'object-path';
import {name, description} from 'json!../../package.json';

const initialData = {
    site: {
        title: name,
        claim: description
    },
    header: {
        size: {
            small: false
        },
        navigation: {
            main: ['Film', 'Buch'],
            open: false
        }
    },
	content: {
		categories: []
	}
};

@Injectable()
export class StateService {
    constructor() {
		this.data = initialData;
    }

    change(path, value) {
        if (path === undefined || value === undefined) {
            return;
        }

        objectPath.set(this.data, path, value);
    }
}
