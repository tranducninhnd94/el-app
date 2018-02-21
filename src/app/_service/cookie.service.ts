import { Cookie } from 'ng2-cookies';
import { Injectable } from '@angular/core';

@Injectable()
export class CookieService {
    constructor() {
        
    }

    getValue(key) {
        return Cookie.get(key);
    }

    setValue(key, value) {
        return Cookie.set(key, value);
    }

    deleteKey(key) {
        return Cookie.delete(key);
    }

    getAll() {
        return Cookie.getAll();
    }

    deleteAll() {
        return Cookie.deleteAll('/');
    }

}