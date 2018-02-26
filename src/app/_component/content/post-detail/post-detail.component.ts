import { Component, OnInit , Pipe, PipeTransform} from "@angular/core";
import { PostService } from "../../../_service/post.service";
import { ToastService } from "../../../_service/toast.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Constants } from "../../../_common/constant";

import { DomSanitizer } from '@angular/platform-browser';


@Pipe({ name: 'safeHtml'})
@Component({
  selector: "post-detail",
  templateUrl: "./post-detail.component.html"
})
export class PostDetail implements OnInit, PipeTransform {
  transform(value: any) {
    return this.sanitized.bypassSecurityTrustHtml(value);
  }
  public postRes: any;

  public postId: string;

  public urlImageDetails: any;

  constructor(
    private postService: PostService,
    private toastService: ToastService,
    private router: ActivatedRoute,
    private location: Location,
    private sanitized: DomSanitizer
  ) { }



  ngOnInit(): void {
    this.getPost();
  }
  public arrImgFile = [];

  public arrDocumentFile = [];

  public host = Constants.SERVER_HOST;

  getPost(): void {
    const _id = this.router.snapshot.paramMap.get("_id");
    this.postId = _id;
    if (_id) {
      this.postService.getOne(_id).subscribe(
        response => {
          if (response.value) {
            this.postRes = response.value;
            this.decodePost(this.postRes);
            console.log("response: ", this.postRes);
          }
        },
        error => {
          this.toastService.showError(error.message);
        }
      );
    }
  }

  decodePost(post): void {
    if (post) {
      post.title = atob(post.title);
      post.content = atob(post.content);
    }
  }
}
