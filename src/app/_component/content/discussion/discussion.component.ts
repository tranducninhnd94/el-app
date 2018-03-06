import { Component, OnInit } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { BsModalService } from "ngx-bootstrap/modal/bs-modal.service";
import { ModalPosts } from "../../modal/modal-posts/modal-posts.component";
import { PostService } from "../../../_service/post.service";
import { ToastService } from "../../../_service/toast.service";
import { Constants } from "../../../_common/constant";
import { PostResponse } from "../../../_model/post.model";
import { Base64 } from "js-base64";
import { DatePipe } from '@angular/common';
import { CookieService } from "../../../_service/cookie.service";

@Component({
  selector: "discussion-partial",
  templateUrl: "./discussion.component.html",
  styleUrls: ["./discussion.component.css"]
})
export class DiscussitonComponent implements OnInit {
  private modalRef: BsModalRef;

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
    private bsModalService: BsModalService,
    private postService: PostService,
    private toastService: ToastService,
    private cookieService: CookieService
  ) { }

  openNewPostsModal() {
    if (this.cookieService.getValue(Constants.COOKIE_TOKEN_NAME)) {
      this.modalRef = this.bsModalService.show(ModalPosts, { backdrop: "static", class: "modal-lg" });
    } else {
      this.toastService.showError("You need to login before creating post");
    }
  }

  ngOnInit(): void {
    this.getAllPosts(true);
  }

  getAllPosts(isPagination): void {
    this.postService.getAllPostV2(this.params).subscribe(
      response => {
        if (response.result == Constants.RESULT_SUCCESS) {
          let value = response.value;
          this.totalPost = value.total;
          this.arrPost = value.list;
          this.decodePost(this.arrPost);
        }

        if (isPagination) {
          this.setupPagination();
        }
        console.log("value ..");
      },
      error => {
        this.toastService.showError(error.message);
      },
      () => {
        console.log("finish ..");
      }
    );
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

    this.getAllPosts(false);
  }

  // decode
  atou(str) {
    return Base64.decode(str);
  }
}
