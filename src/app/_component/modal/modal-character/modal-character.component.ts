import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { TopicResponse } from "../../../_model/response/topic.res";
import { ModalService } from "../../../_service/modal.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "modal-character",
  templateUrl: "./modal-character.component.html"
})
export class ModalCharacter implements OnInit {
  // @ViewChild("inputSelect") inputSelect: ElementRef;

  @ViewChild("formChacracter") formChacracter: FormControl;

  title: string;

  closeBtnName: string = "close";

  confirmBtnName: string = "confirm";

  arrCharacters: any;

  prefixSrc = "../../../../assets/img-werewolf/character/card-";

  sufixSrc  = ".png";

  constructor(public bsModalRef: BsModalRef, private modalService: ModalService) {}

  ngOnInit() {
    console.log("arr : ", this.arrCharacters);
  }
}
