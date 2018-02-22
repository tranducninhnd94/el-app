import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { HttpClient, HttpRequest, HttpEventType, HttpResponse, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import { Observer } from 'rxjs/Observer';
import { CookieService } from './cookie.service';
import { ArrayObject } from '../_model/response/arr.res';
import { ObjectSuccessResponse } from '../_model/response/obj.success.res';
import { Constants } from '../_common/constant';
import { FileResponse } from '../_model/file.model';
import { ObjectErrorResponse } from '../_model/response/obj.error.res';

@Injectable()
export class FileService {

    constructor(private http: Http, private cookieService: CookieService, private httpClient: HttpClient) {

    }

    observer: Observer<any>;

    uploadFileV2(files): Observable<any> {
        let token = this.cookieService.getValue(Constants.COOKIE_TOKEN_NAME);
        let httpHeaders = new HttpHeaders({ 'authorization': 'Bearer ' + token });

        let formData: FormData = new FormData();
        files.forEach(file => {
            formData.append('fileUpload', file, file.name);
        });

        const req = new HttpRequest('POST', Constants.URL_UPLOAD_FILE, formData, {
            headers: httpHeaders,
            reportProgress: true,
        });

        return this.httpClient.request(req);

        // this.httpClient.request(req).subscribe(event => {
        //     if (event.type === HttpEventType.UploadProgress) {
        //         const percentDone = Math.round(100 * event.loaded / event.total);
        //         console.log(`File is ${percentDone}% uploaded.`);
        //         this.observer.next(percentDone);
        //     } else if (event instanceof HttpResponse) {
        //         console.log('File is completely uploaded!');
        //         this.observer.next(event.body);
        //     }
        // })

        // return new Observable(observer => {
        //     this.observer = observer;
        // })

    }

    private handleServerError(error: Response): Observable<ObjectErrorResponse<any>> {
        return Observable.throw(error.json() || 'Server error'); // Observable.throw() is undefined at runtime using Webpack
    }
}