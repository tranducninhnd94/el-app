import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { TopicResponse } from "../../../_model/response/topic.res";
import { ModalService } from "../../../_service/modal.service";
import { FormControl } from "@angular/forms";
import { ModalDirective } from 'ngx-bootstrap/modal';
@Component({
    selector: "modal-register",
    templateUrl: "./modal-register.component.html"
})

export class ModalRegister {
    constructor(public bsModalRef: BsModalRef) { }
}