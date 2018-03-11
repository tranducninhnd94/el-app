import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { FormControl } from "@angular/forms";

@Component({
    selector: "modal-room",
    templateUrl: "./modal-room.component.html"
})
export class ModalRoom {
    @ViewChild("registerForm") registerForm: FormControl;

    constructor(public bsModalRef: BsModalRef) { }

    doCreateRoom() {
        console.log("do create room");
    }
}
