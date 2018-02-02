import { Injectable } from '@angular/core';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ModalService {

    private subject = new Subject<any>();


    constructor() {

    }

    setData(data): void {
        this.subject.next(data);
    }

    clearData(): void {
        this.subject.next();
    }

    getData(): Observable<any> {
        return this.subject.asObservable();
    }


}