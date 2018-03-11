import { Component, OnInit } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ModalRoom } from "../../../modal/modal-room/modal-room.component";

@Component({
    selector: "game-lobby",
    templateUrl: "./lobby.component.html",
    styleUrls: ["./lobby.component.css"]
})

export class LobbyComponent {

    private modalRef: BsModalRef;

    constructor(private bsModalService: BsModalService) {

    }


    showModalRoom(){
        this.modalRef = this.bsModalService.show(ModalRoom, { backdrop: "static" });
    }
}