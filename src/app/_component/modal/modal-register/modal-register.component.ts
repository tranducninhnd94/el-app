import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { TopicResponse } from "../../../_model/response/topic.res";
import { ModalService } from "../../../_service/modal.service";
import { FormControl } from "@angular/forms";
import { ModalDirective } from "ngx-bootstrap/modal";
import { UserService } from "../../../_service/user.service";
import { ToastService } from "../../../_service/toast.service";
import { Constants } from "../../../_common/constant";

@Component({
  selector: "modal-register",
  templateUrl: "./modal-register.component.html"
})
export class ModalRegister {
  @ViewChild("registerForm") registerForm: FormControl;

  constructor(public bsModalRef: BsModalRef, private userService: UserService, private toastService: ToastService) {}

  doRegister() {
    let userRequest = this.registerForm.value;
    this.userService.createUser(userRequest).subscribe(
      response => {
        if (response.result == Constants.RESULT_SUCCESS) {
          this.bsModalRef.hide();
        }
      },
      error => {
        this.toastService.showError(error.message);
      }
    );
  }
}
