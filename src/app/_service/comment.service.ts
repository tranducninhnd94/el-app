import { Injectable } from "@angular/core";
import { Http, Response, Headers, RequestOptions, URLSearchParams } from "@angular/http";
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";
import { CookieService } from "./cookie.service";
import { ObjectSuccessResponse } from "../_model/response/obj.success.res";
import { CommentResponse } from "../_model/comment.model";
import { Constants } from "../_common/constant";
import { ObjectErrorResponse } from "../_model/response/obj.error.res";

@Injectable()
export class CommentService {
  constructor(private http: Http, private cookieService: CookieService) {}

  getCommentByPost(postId, cond): Observable<ObjectSuccessResponse<CommentResponse>> {
    let url = Constants.URL_GET_COMMENT_BY_POST + postId;

    let myParams = new URLSearchParams();
    if (cond.pageNum) {
      myParams.append("pageNum", cond.pageNum);
    }

    if (cond.pageSize) {
      myParams.append("pageSize", cond.pageSize);
    }

    let options = new RequestOptions({ params: myParams });

    return this.http
      .get(url, options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  postComment(_body): Observable<ObjectSuccessResponse<any>> {
    let url = Constants.URL_POST_COMMENT;
    let token = this.cookieService.getValue(Constants.COOKIE_TOKEN_NAME);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authorization", "Bearer " + token);

    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(url, _body, options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  replyComment(parentId, _body): Observable<ObjectSuccessResponse<any>> {
    let url = Constants.URL_REPLY_COMMENT + parentId;
    let token = this.cookieService.getValue(Constants.COOKIE_TOKEN_NAME);

    let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("authorization", "Bearer " + token);

    let options = new RequestOptions({ headers: headers });

    return this.http
      .post(url, _body, options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  private handleServerError(error: Response): Observable<ObjectErrorResponse<any>> {
    return Observable.throw(error.json() || "Server error"); // Observable.throw() is undefined at runtime using Webpack
  }
}
