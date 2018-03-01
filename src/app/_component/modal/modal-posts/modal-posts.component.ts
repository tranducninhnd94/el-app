import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { ToastService } from "../../../_service/toast.service";
import { FormControl } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import { FileService } from "../../../_service/file.service";
import { HttpEventType, HttpResponse } from "@angular/common/http";
import { Constants } from "../../../_common/constant";
import { PostService } from "../../../_service/post.service";
import { Base64 } from "js-base64";
import { CookieService } from "../../../_service/cookie.service";
import { Router } from "@angular/router";

declare var jquery: any;
declare var $: any;
@Component({
  selector: "modal-posts",
  templateUrl: "./modal-posts.component.html"
})
export class ModalPosts implements OnInit, OnDestroy {
  private currentPresent = "0%";

  private SERVER_HOST = Constants.SERVER_HOST;

  ngOnDestroy(): void {
    $("#summernote").summernote("destroy");
  }
  @ViewChild("newPostsForm") newPostsForm: FormControl;
  constructor(
    private bsModalRef: BsModalRef,
    private toastService: ToastService,
    private fileService: FileService,
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    $("#summernote").summernote({
      placeholder: "write something ... ",
      height: 400, // set editor height
      minHeight: null, // set minimum height of editor
      maxHeight: null, // set maximum height of editor
      focus: true, // set focus to editable area after initializing summernote
      toolbar: [
        // ["edit", ["undo", "redo"]],
        ["headline", ["style"]],
        ["style", ["bold", "italic", "underline", "clear"]],
        ["fontface", ["fontname"]],
        ["fontsize", ["fontsize"]],
        ["fontclr", ["color"]],
        ["alignment", ["ul", "ol", "paragraph", "lineheight"]],
        ["height", ["height"]],
        ["table", ["table"]],
        ["insert", ["link", "picture"]],
        ["view", ["fullscreen", "codeview"]],
        ["help", ["help"]]
      ],
      callbacks: {
        onImageUpload: function (files) {
          this.fileUpload(files);
        }.bind(this),

        onMediaDelete: function (target) {
          console.log("target", target);
          this.fileDelete(target[0]);
        }.bind(this)
      }
    });
  }
  fileUpload(files) {
    //upload
    let filesArray = Array.prototype.slice.call(files);
    console.log(files);
    this.fileService.uploadFileV2(filesArray).subscribe(
      event => {
        if (event.type === HttpEventType.UploadProgress) {
          const percentDone = Math.round(100 * event.loaded / event.total);
          this.currentPresent = percentDone + "%";
          console.log("current: ", this.currentPresent);
        } else if (event instanceof HttpResponse) {
          let file_url = [];
          if (event.body.value && event.body.value.list) {
            let list = event.body.value.list;
            list.forEach(fileRes => {
              file_url.push(fileRes);
            });
          }
          console.log("file_url", file_url);
          if (file_url && file_url[0].path) {
            let imageTag = $("<img>")
              .attr({
                src: this.SERVER_HOST + file_url[0].path,
                class: "image_upload",
                alt: file_url[0].originalname
              })
              .css({ "max-width": 300, float: "left" });
            $("#summernote").summernote("insertNode", imageTag[0]);
          }
        }
      },
      error => {
        this.toastService.showError(error.error.message);
      }
    );
  }
  fileDelete(file) {
    console.log("delete file");
  }
  doNewPosts() {



    let textareaValue = $("#summernote").summernote("code");
    let title = this.newPostsForm.value.title;
    let description = this.newPostsForm.value.description;
    console.log('description : ', description);
    // encode
    // let encodeTitle = this.utoa(title);
    let encodeContent = this.utoa(textareaValue);
    // let encodeDescription = this.utoa(description);
    let fileNameUsed = this.getAttrImg();
    let objectRequest = { title, description, content: encodeContent, fileNameUsed: fileNameUsed };
    console.log(objectRequest);

    // call service
    this.postService.createPost(objectRequest).subscribe(
      response => {
        if (response.result == Constants.RESULT_SUCCESS) {
          this.bsModalRef.hide();
          this.toastService.showSuccess(response.message);
          location.reload();
        } else {
          this.toastService.showError("Error create new post");
        }
      },
      error => {
        this.toastService.showError(error.message);
      }
    );

  }

  getAttrImg(): any {
    var fileNameUsed = $(".image_upload")
      .map(function () {
        return $(this).attr("alt");
      })
      .get();
    console.log("namesUsed : ", fileNameUsed);
    return fileNameUsed;
  }

  // encode string
  utoa(str) {
    return Base64.encode(str);
  }
}
