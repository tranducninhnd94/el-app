import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, Validators, FormsModule, NgForm } from "@angular/forms";
import { DatePipe } from "@angular/common";
import { Constants } from "../../../_common/constant";
import { CommentService } from "../../../_service/comment.service";
import { ToastService } from "../../../_service/toast.service";
import { CookieService } from "../../../_service/cookie.service";

@Component({
  selector: "comment-partial",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.css"]
})
export class CommentComponent implements OnInit {
  @Input() postId: string;

  @ViewChild("formComment") formComment: NgForm;

  @ViewChild("formReply") formReply: NgForm;

  public commentReq: any = {};

  public comments: any = [];

  public params: any = {};

  public pageNum: number = 0;

  public pageSize: number = 10;

  public defaultValue: string = "";

  public isReply: boolean = false;

  public host = Constants.SERVER_HOST;

  public avatarDefault = Constants.AVATAR_DEFAULT;

  public myAvatarUrl: string;

  public clientHost = Constants.CLIENT_HOST;

  public userLink = this.clientHost + "user/search/";

  // form reply
  public arrCheckDisplay: Array<boolean> = []; // using display form reply

  public indexActived: number;
  constructor(
    private commentService: CommentService,
    private toastService: ToastService,
    private cookieService: CookieService
  ) {}

  loadCommentByPost(): void {
    this.commentService.getCommentByPost(this.postId, this.params).subscribe(
      obj => {
        if (obj.result == Constants.RESULT_SUCCESS && obj.value) {
          let tmp = obj.value;
          this.comments = obj.value;
          this.setArrcheckDisplay(this.comments);
        }
      },
      error => {
        this.toastService.showError(error.message);
      }
    );
  }

  setArrcheckDisplay(arrComment) {
    this.arrCheckDisplay = [];
    arrComment.forEach(element => {
      this.arrCheckDisplay.push(false);
    });
  }

  setIndexInArrCheckDisplay(newIndex) {
    if (this.indexActived || this.indexActived == 0) {
      this.arrCheckDisplay[this.indexActived] = false;
    }
    this.arrCheckDisplay[newIndex] = true;
    this.indexActived = newIndex;
  }

  ngOnInit(): void {
    this.loadCommentByPost();
    this.getMyAvatarUrl();
  }

  getMyAvatarUrl(): void {
    let tmp = this.cookieService.getValue(Constants.COOKIE_AVATAR_URL);
    if (tmp) {
      this.myAvatarUrl = tmp;
    }
  }

  changePagination(index): void {
    this.params.pageNum = index;
    this.params.pageSize = 10;
  }

  doComment(infoComment): void {
    this.resetCommentReq();
    if (infoComment.content) {
      this.commentReq.content = infoComment.content;
      this.commentReq.post = this.postId;
      this.commentReq.image_url = [];

      this.commentService.postComment(this.commentReq).subscribe(
        obj => {
          if (obj.result == Constants.RESULT_SUCCESS) {
            this.toastService.showSuccess(obj.message);
            this.formComment.reset();
            this.loadCommentByPost();
          }
        },
        error => {
          this.toastService.showError(error.message);
        }
      );
    } else {
      this.toastService.showWarning(Constants.ERROR_EMPTY_CONTENT_COMMENT);
    }
  }

  doReply(parentId, infoReply): void {
    this.resetCommentReq();
    if (infoReply.content && parentId) {
      this.commentReq.content = infoReply.content;
      this.commentReq.post = this.postId;
      this.commentReq.image_url = [];
      this.commentService.replyComment(parentId, this.commentReq).subscribe(
        obj => {
          if (obj.result == Constants.RESULT_SUCCESS) {
            this.toastService.showSuccess(obj.message);
            this.formReply.reset();
            this.loadCommentByPost();
          }
        },
        error => {
          this.toastService.showError(error.message);
        }
      );
    } else {
      this.toastService.showWarning(Constants.ERROR_EMPTY_CONTENT_COMMENT);
    }
  }

  resetCommentReq(): void {
    this.commentReq = {};
  }

  loadMore(): void {}

  enableFormReply(index): void {
    this.setIndexInArrCheckDisplay(index);
  }
}
