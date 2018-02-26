import { Component, ViewChild } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { FormControl } from "@angular/forms";
import { UserService } from "../../../_service/user.service";
import { ToastService } from "../../../_service/toast.service";
import { Constants } from "../../../_common/constant";
import { CookieService } from "../../../_service/cookie.service";
import { Router } from "@angular/router";
import { ModalService } from "../../../_service/modal.service";

@Component({
  selector: "modal-login",
  templateUrl: "./modal-login.component.html"
})
export class ModalLogin {
  @ViewChild("loginForm") loginForm: FormControl;

  constructor(
    private bsModalRef: BsModalRef,
    private userService: UserService,
    private toastService: ToastService,
    private cookieService: CookieService,
    private router: Router,
    private modalService: ModalService
  ) {}

  doLogin() {
    let userRequest = this.loginForm.value;
    this.userService.loginUser(userRequest).subscribe(
      response => {
        if (response.result == Constants.RESULT_SUCCESS) {
          let value = response.value;
          this.cookieService.setValue(Constants.COOKIE_TOKEN_NAME, value.token);

          let token = value.token;
          let info = value.info;
          let email = info.email;
          let fullname = info.fullname;
          let _id = info._id;
          let avatar_url = info.avatar_url;

          this.setInfoToCookie(token, email, fullname, _id, avatar_url);

          this.bsModalRef.hide();
          this.modalService.setData({ isLogin: true });
          this.router.navigate(["topic"]);
        }
      },
      error => {
        this.toastService.showError(error.message);
      }
    );
  }

  setInfoToCookie(token, email, fullname, _id, avatar_url) {
    this.cookieService.deleteAll();
    this.cookieService.setValue(Constants.COOKIE_TOKEN_NAME, token);
    this.cookieService.setValue(Constants.COOKIE_EMAIL, email);
    this.cookieService.setValue(Constants.COOKIE_FULLNAME, fullname);
    this.cookieService.setValue(Constants.COOKIE_ID, _id);
    if (avatar_url) {
      this.cookieService.setValue(Constants.COOKIE_AVATAR_URL, avatar_url);
    }
  }
}
