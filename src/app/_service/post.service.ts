import { Injectable } from "@angular/core";
import { Observer } from "rxjs/Observer";
import { Subject } from "rxjs/Subject";
import { Observable } from "rxjs/Observable";
import { CookieService } from "./cookie.service";
import { Http, ResponseOptions, Response, Headers, RequestOptions } from "@angular/http";
import { ObjectSuccessResponse } from "../_model/response/obj.success.res";
import { PostResponse } from "../_model/post.model";
import { ObjectErrorResponse } from "../_model/response/obj.error.res";
import { Constants } from "../_common/constant";
import { ArrayObject } from "../_model/response/arr.res";

@Injectable()
export class PostService {
  constructor(private cookeiService: CookieService, private http: Http) { }


  getAllPostV2(params): Observable<ObjectSuccessResponse<ArrayObject<PostResponse[]>>> {
    const myParams = new URLSearchParams();
    if (params) {
      // if (params.title) {
      //   myParams.append("title", params.title);
      // }
      // if (params.author) {
      //   myParams.append("author", params.author);
      // }
      // if (params.createAt) {
      //   myParams.append("createAt", params.createAt);
      // }
      if (params.pageNum) {
        myParams.append("pageNum", params.pageNum);
      }
      if (params.pageSize) {
        myParams.append("pageSize", params.pageSize);
      }
      if (params.status) {
        myParams.append("status", params.status);
      }
      // if (params.sortBy) {
      //   myParams.append("sortBy", params.sortBy);
      // }
      // if (params.asc) {
      //   myParams.append("orderBy", params.asc);
      // }
    }

    const options = new RequestOptions({ params: myParams });
    return this.http
      .get(Constants.URL_GET_ALL_POST_V2, options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  getAllPost(params): Observable<ObjectSuccessResponse<ArrayObject<PostResponse[]>>> {
    let myParams = new URLSearchParams();
    if (params) {
      if (params.title) {
        myParams.append("title", params.title);
      }
      if (params.author) {
        myParams.append("author", params.author);
      }
      if (params.createAt) {
        myParams.append("createAt", params.createAt);
      }
      if (params.pageNum) {
        myParams.append("pageNum", params.pageNum);
      }
      if (params.pageSize) {
        myParams.append("pageSize", params.pageSize);
      }
      if (params.sortBy) {
        myParams.append("sortBy", params.sortBy);
      }
      if (params.asc) {
        myParams.append("orderBy", params.asc);
      }
    }

    const options = new RequestOptions({ params: myParams });
    return this.http
      .get(Constants.URL_GET_ALL_POST, options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  createPost(postReq): Observable<ObjectSuccessResponse<PostResponse>> {
    const headers = new Headers();
    headers.append("authorization", "Bearer " + this.cookeiService.getValue(Constants.COOKIE_TOKEN_NAME));
    const options = { headers };
    console.log("headers :", headers, "option : ", options);
    return this.http
      .post(Constants.URL_CREATE_POST, postReq, options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  getOne(_id): Observable<ObjectSuccessResponse<PostResponse>> {
    const url = `${Constants.URL_GET_ONE_POST}/${_id}`;
    const headers = new Headers();
    if (this.cookeiService.getValue(Constants.COOKIE_TOKEN_NAME)) {
      headers.append("authorization", "Bearer " + this.cookeiService.getValue(Constants.COOKIE_TOKEN_NAME));
    }
    const options = { headers };
    return this.http
      .get(url, options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  getAllPostUnread(params): Observable<ObjectSuccessResponse<ArrayObject<PostResponse[]>>> {
    const myParams = new URLSearchParams();
    if (params) {

      if (params.pageNum) {
        myParams.append("pageNum", params.pageNum);
      }
      if (params.pageSize) {
        myParams.append("pageSize", params.pageSize);
      }
    }

    const headers = new Headers();
    headers.append("authorization", "Bearer " + this.cookeiService.getValue(Constants.COOKIE_TOKEN_NAME));

    const options = new RequestOptions({ params: myParams, headers });
    return this.http
      .get(Constants.URL_GET_ALL_POST_UNREAD, options)
      .map((res: Response) => res.json())
      .catch(this.handleServerError);
  }

  private handleServerError(error: Response): Observable<ObjectErrorResponse<any>> {
    return Observable.throw(error.json() || "Server error"); // Observable.throw() is undefined at runtime using Webpack
  }
}
