import { Component, OnInit, ViewEncapsulation, SecurityContext } from "@angular/core";
import { PostService } from "../../../_service/post.service";
import { ToastService } from "../../../_service/toast.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Constants } from "../../../_common/constant";
import { Base64 } from "js-base64";
import { DomSanitizer } from "@angular/platform-browser";

@Component({
  selector: "post-detail",
  templateUrl: "./post-detail.component.html",
  encapsulation: ViewEncapsulation.None
})
export class PostDetail implements OnInit {
  public postRes: any;

  public postId: string;

  public urlImageDetails: any;

  //SafeResourceUrl
  private iframe;

  constructor(
    private postService: PostService,
    private toastService: ToastService,
    private router: ActivatedRoute,
    private location: Location,
    private sanitizer: DomSanitizer
  ) {
    // this.iframe = sanitizer.bypassSecurityTrustResourceUrl("https://www.google.com");
  }

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
            this.postRes.content = this.sanitizer.bypassSecurityTrustHtml(this.postRes.content);
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
      post.content = this.atou(post.content);
    }
  }

  atou(str) {
    return Base64.decode(str);
  }
}
