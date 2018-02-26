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
import { UserResponse, UserRequest, LoginInfo } from "../_model/user.model";
import { Constants } from "../_common/constant";

@Injectable()
export class UserService {
  constructor(private http: Http) {}

  createUser(userRequest): Observable<ObjectSuccessResponse<UserResponse>> {
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    let options = { headers: headers };
    return this.http
      .post(Constants.URL_CREATE_USER, userRequest, options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  loginUser(userRequest): Observable<ObjectSuccessResponse<LoginInfo>> {
    const headers = new Headers();
    headers.append("Content-type", "application/json");
    const options = { headers: headers };
    return this.http
      .post(Constants.URL_LOGIN_USER, userRequest, options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  private handleServerError(error: Response): Observable<ObjectErrorResponse<any>> {
    return Observable.throw(error.json() || "Server error"); // Observable.throw() is undefined at runtime using Webpack
  }
}
