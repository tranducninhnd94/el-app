import { Component } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { BsModalService } from "ngx-bootstrap/modal/bs-modal.service";

import {ModalRegister} from '../modal/modal-register/modal-register.component';

@Component({
  selector: "top-partial",
  templateUrl: "./top.component.html",
  styleUrls: ["./top.component.css"]
})
export class TopComponent {

  private modalRef: BsModalRef;

  constructor(private bsModalService: BsModalService){

  }

  openModalRegiter(): void{
    this.modalRef = this.bsModalService.show(ModalRegister, {backdrop: "static"})
  }

}
