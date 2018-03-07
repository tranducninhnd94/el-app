import { Component, OnInit } from "@angular/core";
import { PostService } from "../../../_service/post.service";
import { CookieService } from "../../../_service/cookie.service";
import { Constants } from "../../../_common/constant";
import { PostResponse } from "../../../_model/post.model";
import { Base64 } from "js-base64";
import { DatePipe } from '@angular/common';
@Component({
    selector: "unread-partial",
    templateUrl: "./unread.component.html",
    styleUrls: ["./unread.component.css"]
})

export class UnreadComponent implements OnInit {


    private params: any;

    private arrPost: Array<PostResponse> = [];

    private totalPost: number = 0;

    private pageNum = Constants.PAGE_NUM_DEFAULT;

    private pageSize = Constants.PAGE_SIZE_DEFAULT;

    private pagination = [];

    private avatarDefault = Constants.AVATAR_DEFAULT;

    private server_host = Constants.SERVER_HOST;

    private descriptionDefault = Constants.DESCRIPTION_DEFAULT_OF_POST;



    constructor(
        private postService: PostService,
        private cookieService: CookieService
    ) { }


    ngOnInit(): void {
        this.getAllPostUnread(true);
    }

    getAllPostUnread(isPagination): void {
        this.postService.getAllPostUnread(this.params).subscribe(response => {
            if (response.result == Constants.RESULT_SUCCESS) {
                let value = response.value;
                this.totalPost = value.total;
                this.arrPost = value.list;
                this.decodePost(this.arrPost);
            }

            if (isPagination) {
                this.setupPagination();
            }
        }, error => {
            console.log(error);
        })
    }

    decodePost(arrPost): void {
        if (arrPost) {
            arrPost.forEach(post => {
                // post.title = this.atou(post.title);
                post.content = this.atou(post.content);
            });
        }
    }

    // pagination
    setupPagination() {
        let numberPage = this.totalPost / this.pageSize;

        if (this.totalPost % this.pageSize != 0) {
            ++numberPage;
        }
        for (let i = 1; i <= numberPage; i++) {
            this.pagination.push(i);
        }
    }

    changePagination(index): void {
        this.params = {};
        this.params.pageNum = index;
        this.params.pageSize = 5;

        this.getAllPostUnread(false);
    }

    // decode
    atou(str) {
        return Base64.decode(str);
    }

}