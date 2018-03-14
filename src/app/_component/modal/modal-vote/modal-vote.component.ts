import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { TopicResponse } from "../../../_model/response/topic.res";
import { ModalService } from "../../../_service/modal.service";
import { FormControl } from "@angular/forms";
import { NspRoomService } from "../../../_service/socket.nsp.room.service";
import { GamerInfo } from "../../../_model/socket.model";

@Component({
  selector: "modal-character",
  templateUrl: "./modal-vote.component.html"
})
export class ModalVote implements OnInit {
  // @ViewChild("inputSelect") inputSelect: ElementRef;

  @ViewChild("formVote") formVote: FormControl;

  title: string;

  closeBtnName: string = "close";

  confirmBtnName: string = "confirm";

  meInfo: GamerInfo;

  nameRoom: string;

  answer: number = 1; // 1- yes 2- no

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: ModalService,
    private nspRoomService: NspRoomService
  ) {}

  ngOnInit() {}

  confirmVote() {
    console.log("form vote : ", this.formVote.value);

    let objVote = { infoVote: { gamer: this.meInfo, answer: this.answer }, roomName: this.nameRoom };
  }

  onSelectionChange(value) {
    console.log("change..", value);
    if (value == "yes") this.answer = 1;
    else this.answer = 0;
  }
}
