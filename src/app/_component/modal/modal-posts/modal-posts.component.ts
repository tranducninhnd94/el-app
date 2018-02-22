import { Component, ViewChild, OnInit, OnDestroy } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { ToastService } from "../../../_service/toast.service";
import { FormControl } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import { FileService } from "../../../_service/file.service";
import { HttpEventType, HttpResponse } from '@angular/common/http';

declare var jquery: any;
declare var $: any;
@Component({
    selector: "modal-posts",
    templateUrl: "./modal-posts.component.html"
})
export class ModalPosts implements OnInit, OnDestroy {

    private currentPresent = '0%';

    ngOnDestroy(): void {
        $("#summernote").summernote("destroy");
    }
    @ViewChild("newPostsForm") newPostsForm: FormControl;
    constructor(private bsModalRef: BsModalRef, private toastService: ToastService, private fileService: FileService) { }

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
    fileUpload(files) { //upload
        let filesArray = Array.prototype.slice.call(files);
        console.log(files);
        this.fileService.uploadFileV2(filesArray).subscribe(event => {
            if (event.type === HttpEventType.UploadProgress) {
                const percentDone = Math.round(100 * event.loaded / event.total);
                this.currentPresent = percentDone + '%';
                console.log('current: ', this.currentPresent);
            } else if (event instanceof HttpResponse) {
                let file_url = [];
                if (event.body.value && event.body.value.list) {
                    let list = event.body.value.list;
                    list.forEach(fileRes => {
                        file_url.push(fileRes);
                    });
                }
                console.log('file_url', file_url);
            }
        }, error => {
            this.toastService.showError(error.error.message);
        })

        var image = $("<img>").attr("src", "http://600tuvungtoeic.com/template/english/images/lesson/contracts.jpg");
        console.log("image1 : ", image);
        console.log("image", image[0]);
        $("#summernote").summernote("insertNode", image[0]);
    }
    fileDelete(file) {
        console.log("delete file");
    }
    doNewPosts() {
        let textareaValue = $("#summernote").summernote("code");
        let title = this.newPostsForm.value.title;
        let encode = btoa(textareaValue);
        let objectRequest = { title, content: encode };
        console.log(objectRequest);
    }


}