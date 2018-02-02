import { Component, OnInit, ViewChild , ElementRef} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';
import { TopicResponse } from '../../../_model/response/topic.res';
import { ModalService } from '../../../_service/modal.service';
import { FormControl } from '@angular/forms';

@Component({
    selector: 'modal-select',
    templateUrl: './modal-select.component.html'
})

export class ModalSelect implements OnInit {

    @ViewChild('inputSelect') inputSelect: ElementRef;

    @ViewChild('formSelect') formSelect: FormControl;

    title: string;

    closeBtnName: string;

    confirmBtnName: string;

    arrTopics: Array<TopicResponse>;


    constructor(public bsModalRef: BsModalRef, private modalService: ModalService) { }

    ngOnInit() {

    }

    doConfirmSelect(value) {
        console.log(value);
        console.log('aaaaaaaaa',this.inputSelect.nativeElement.value);
        console.log('confirm.');
        this.modalService.setData('Hello, i am Ninh');
        console.log(this.formSelect);
    }
}