import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import "rxjs/add/observable/throw";

import { ObjectSuccessResponse } from "../_model/response/obj.success.res";
import { ObjectErrorResponse } from "../_model/response/obj.error.res";
import { ArrayObject } from "../_model/response/arr.res";
import { TopicResponse } from "../_model/response/topic.res";
import { Constants } from "../_common/constant";

@Injectable()
export class TopicService {
  constructor(private http: Http) {}

  getAllTopic(): Observable<ObjectSuccessResponse<ArrayObject<Array<TopicResponse>>>> {
    return this.http
      .get(Constants.URL_GET_TOPIC)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  private handleServerError(error: Response): Observable<ObjectErrorResponse<any>> {
    return Observable.throw(error.json() || "Server error"); // Observable.throw() is undefined at runtime using Webpack
  }
}
