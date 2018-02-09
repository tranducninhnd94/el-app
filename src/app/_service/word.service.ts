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
import { WordResponse } from "../_model/response/word.res";
import { Constants } from "../_common/constant";

@Injectable()
export class WordService {
  constructor(private http: Http) {}

  getWordsByTopic(_idTopic): Observable<ObjectSuccessResponse<ArrayObject<WordResponse>>> {
    return this.http
      .get(`${Constants.URL_GET_WORD_BY_TOPIC}/${_idTopic}`)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  getAll(): Observable<ObjectSuccessResponse<ArrayObject<Array<WordResponse>>>> {
    return this.http
      .get(Constants.URL_GET_ALL_WORD)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  getByIdTopic(arrIds: any): Observable<ObjectSuccessResponse<ArrayObject<Array<WordResponse>>>> {
    let headers = new Headers();
    headers.append("Content-type", "application/json");
    return this.http
      .post(Constants.URL_GET_WORD_BY_IDS_TOPIC, arrIds, { headers: headers })
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  private handleServerError(error: Response): Observable<ObjectErrorResponse<any>> {
    return Observable.throw(error.json() || "Server error"); // Observable.throw() is undefined at runtime using Webpack
  }
}
