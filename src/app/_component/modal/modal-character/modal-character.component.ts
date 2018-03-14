import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { TopicResponse } from "../../../_model/response/topic.res";
import { ModalService } from "../../../_service/modal.service";
import { FormControl } from "@angular/forms";
import { NspRoomService } from "../../../_service/socket.nsp.room.service";

@Component({
  selector: "modal-character",
  templateUrl: "./modal-character.component.html"
})
export class ModalCharacter implements OnInit {
  // @ViewChild("inputSelect") inputSelect: ElementRef;

  @ViewChild("formChacracter") formChacracter: FormControl;

  title: string;

  closeBtnName: string = "close";

  totalGamer: number;

  confirmBtnName: string = "confirm";

  arrCharacters: any;

  prefixSrc = "../../../../assets/img-werewolf/character/card-";

  sufixSrc = ".png";

  totalChoose: number = 0;

  formIsvalid = true;

  nameRoom: string;

  constructor(
    public bsModalRef: BsModalRef,
    private modalService: ModalService,
    private nspRoomService: NspRoomService
  ) {}

  ngOnInit() {
    console.log("arr : ", this.arrCharacters);
    console.log("total gamer : ", this.totalGamer);
  }

  updateCheckedOptions(index, event) {
    if (event.target.checked) {
      this.arrCharacters[index].quantity = 1;
    } else {
      this.arrCharacters[index].quantity = 0;
    }
    this.arrCharacters[index].checked = event.target.checked;
  }

  confirmCustomize() {
    console.log("arr : ", this.arrCharacters);

    this.getTotalChoose();

    if (this.totalGamer == this.totalChoose) {
      let obj = { totalGamer: this.totalGamer, arrCharacters: this.arrCharacters, nameRoom: this.nameRoom };

      this.nspRoomService.sk_startGame(obj);

      this.bsModalRef.hide();
    } else {
      this.formIsvalid = false;
    }
  }

  updateQuantity(i) {
    this.arrCharacters.forEach(element => {
      if (element.checked) this.totalChoose += element.quantity;
    });
  }

  getTotalChoose(): void {
    this.totalChoose = 0;
    this.arrCharacters.forEach(character => {
      if (character.checked) {
        this.totalChoose += character.quantity;
      }
    });
  }
}
