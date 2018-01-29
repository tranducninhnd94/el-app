import { Component, TemplateRef, OnInit, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal/bs-modal-ref.service';

import { WordService } from '../../../_service/word.service';
import { ToastService } from '../../../_service/toast.service';

import { ArrayObject } from '../../../_model/response/arr.res';
import { WordResponse } from '../../../_model/response/word.res';
import { Constants } from '../../../_common/constant';

@Component({
    selector: 'practice-partial',
    templateUrl: './practice.component.html',
    styleUrls: ['./practice.component.css']
})

export class PracticeComponent implements OnInit, AfterViewInit {

    @ViewChild('audioElement') audioElement: ElementRef;

    @ViewChild('audioplayersource') audioplayersource: ElementRef;

    @ViewChild('audioElement1') audioElement1: ElementRef;

    @ViewChild('audioplayersource1') audioplayersource1: ElementRef;

    private modalRef: BsModalRef;

    private serverHost = Constants.SERVER_HOST;

    private time = 0;

    private isFocus = true;

    private resetTime = true;

    private answer = '';

    private answer1 = 'aaa';

    private valueRes: ArrayObject<Array<WordResponse>>;

    private words: Array<WordResponse>;

    private position = 0;

    private word: WordResponse;

    private isLoser = false;

    private myVar: any;

    private nameWord = "";

    constructor(private modalService: BsModalService, private wordService: WordService, private toastService: ToastService) {
        this.time = 10;
        console.log('position: ', this.position);
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    ngOnInit(): void {

        this.getAllWords();


        console.log('position: ', this.position);
    }

    countDown(): void {
        this.time = 10;
        this.myVar = setInterval(() => {
            this.time--;
            if (this.time == 0) {
                this.isLoser = true;
                clearInterval(this.myVar);
            }
        }, 1000);
    }

    clearTimeout(): void {
        clearInterval(this.myVar);
    }

    Sourcelink = "";

    ngAfterViewInit(): void {

        if (this.myVar) {
            this.clearTimeout();
        }
        this.countDown();
    }

    getAllWords(): void {
        this.wordService.getAll().subscribe(response => {
            if (response.result == 200) {
                this.valueRes = response.value;
                this.words = this.valueRes.list;
                console.log(this.valueRes);
                console.log(this.words);
            }

            this.setValue(this.position);
            console.log('element : ', this.audioplayersource);
        }, error => {
            console.log('error: ', error);
        })
    }

    setValue(i): void {

        if (i >= 0 && i < this.valueRes.total) {
            console.log('position :1 ', this.position)
            this.word = this.words[i];
            this.Sourcelink = this.serverHost + this.word.audio.audio_url;
            console.log(this.nameWord);
            this.audioElement.nativeElement.load();
            setTimeout(() => {
                this.audioElement.nativeElement.play();
            }, 1000);
        }
    }

    onKey(event: KeyboardEvent) {
        if (this.isFocus == true && event.keyCode == 13 && event.shiftKey == false) {
            if (this.word.name && this.answer) {
                this.word = null;
                this.answer = "";
                console.log('-----', this.position);
                this.clearTimeout();
                this.countDown();
                this.setValue(++this.position);

            } else {
                this.answer = "";
                this.toastService.showError('Wrong!')
            }
        }
    }


    onKey1(event: KeyboardEvent) {
        console.log('aaaaaaaaaaaaaaaa');
        if (event.keyCode == 13 && event.shiftKey == false) {
            if (this.answer1 == '1') {
                console.log('111111111111111');
                this.doContinue();
            } else {
                console.log('22222222222222222');
            }
        }
    }

    doContinue(): void {
        this.isLoser = false;
        this.clearTimeout();
        this.countDown();
        this.setValue(++this.position);
    }
}
