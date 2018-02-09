import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { TopicResponse } from "../../../_model/response/topic.res";
import { ModalService } from "../../../_service/modal.service";
import { FormControl } from "@angular/forms";

@Component({
  selector: "modal-select",
  templateUrl: "./modal-select.component.html"
})
export class ModalSelect implements OnInit {
  @ViewChild("inputSelect") inputSelect: ElementRef;

  @ViewChild("formSelect") formSelect: FormControl;

  title: string;

  closeBtnName: string;

  confirmBtnName: string;

  arrTopics: any;

  constructor(public bsModalRef: BsModalRef, private modalService: ModalService) {}

  ngOnInit() {}

  doConfirmSelect() {
    let arrChoose = [];
    this.arrTopics.forEach(element => {
      if (element.checked) {
        arrChoose.push(element._id);
      }
    });
    this.modalService.setData(arrChoose);
  }

  setIsCheckForCheckbox(value: boolean): void {
    if (this.arrTopics) {
      this.arrTopics.forEach(element => {
        element.checked = value;
      });
    }
  }

  changeAllCheckbox(event) {
    console.log(event);
    let isChecked = event.target.checked;
    console.log(isChecked);
    this.setIsCheckForCheckbox(isChecked);
  }

  updateCheckedOptions(index, event) {
    this.arrTopics[index].checked = event.target.checked;
  }
}
