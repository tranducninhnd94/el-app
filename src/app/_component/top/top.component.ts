import { Component, OnInit, OnDestroy } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { BsModalService } from "ngx-bootstrap/modal/bs-modal.service";

import { ModalRegister } from "../modal/modal-register/modal-register.component";
import { ModalLogin } from "../modal/modal-login/modal-login.component";
import { CookieService } from "../../_service/cookie.service";
import { Constants } from "../../_common/constant";
import { Router } from "@angular/router";
import { ModalService } from "../../_service/modal.service";
import { UserService } from "../../_service/user.service";

@Component({
  selector: "top-partial",
  templateUrl: "./top.component.html",
  styleUrls: ["./top.component.css"]
})
export class TopComponent implements OnInit, OnDestroy {
  ngOnDestroy(): void {
    this.modalService.clearData();
  }

  private isLogin: boolean = false;

  private totalPostUnread: Number = 0;

  ngOnInit(): void {
    if (this.cookieService.getValue(Constants.COOKIE_TOKEN_NAME)) {
      this.isLogin = true;

      //count unread post
      this.countPostUnread();
    }

    this.modalService.getData().subscribe(
      result => {
        if (result) {
          this.isLogin = result.isLogin;
          this.countPostUnread();
        }
      },
      error => {
        console.log("error", error);
      }
    );
  }

  countPostUnread(): void {
    this.userService.countPostUnread().subscribe(
      response => {
        if (response.result == Constants.RESULT_SUCCESS) {
          this.totalPostUnread = response.value;
        }
        // console.log(response);
      },
      error => {
        console.log(error);
      }
    );
  }

  private modalRef: BsModalRef;

  constructor(
    private bsModalService: BsModalService,
    private cookieService: CookieService,
    private router: Router,
    private modalService: ModalService,
    private userService: UserService
  ) {}

  openModalRegiter(): void {
    this.modalRef = this.bsModalService.show(ModalRegister, { backdrop: "static" });
  }

  openModalLogin() {
    console.log("login clicked..");
    this.modalRef = this.bsModalService.show(ModalLogin, { backdrop: "static" });
  }

  doLogout() {
    this.cookieService.deleteAll();
    this.isLogin = false;
    console.log(this.router);
    let currentUrl = this.router.url;
    // console.log("currentUrl :", currentUrl);
    this.router.navigate([currentUrl]);
    location.reload();
  }
}
