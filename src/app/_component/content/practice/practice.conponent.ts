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

    @ViewChild('answerInput') answerInput: ElementRef;

    private modalRef: BsModalRef;

    private serverHost = Constants.SERVER_HOST;

    private time = 0;

    private isFocus = true;

    private resetTime = true;

    private answer = '';

    private valueRes: ArrayObject<Array<WordResponse>>;

    private words: Array<WordResponse>;

    private position = 0;

    private word: WordResponse;

    private isLoser = false;

    private myVar: any;

    private Sourcelink = "";

    private question = "";

    private TIME_CONSTANT = 15;

    constructor(private modalService: BsModalService, private wordService: WordService, private toastService: ToastService) {
        this.time = this.TIME_CONSTANT;
        console.log('position: ', this.position);
    }

    openModal(template: TemplateRef<any>) {
        this.modalRef = this.modalService.show(template);
    }

    ngOnInit(): void {
        this.getAllWords();
        this.isLoser = false;
        // this.setFocus();
    }

    countDown(): void {
        this.time = this.TIME_CONSTANT;
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
            }
            this.setValue(this.position);
        }, error => {
            console.log('error: ', error);
        })
    }

    setValue(i): void {

        if (i >= 0 && i < this.valueRes.total) {
            this.word = this.words[i];
            this.question = this.word.vocabulary;
            this.Sourcelink = this.serverHost + this.word.audio.audio_url;
            this.audioElement.nativeElement.load();
            setTimeout(() => {
                this.audioElement.nativeElement.play();
            }, 1000);
        }
    }

    onKey(event: KeyboardEvent) {
        if (this.isFocus == true && event.keyCode == 13 && event.shiftKey == false) {
            if (this.answer.trim() == this.word.name.trim()) {
                this.toastService.showSuccess('Good');
                this.reset();
            } else {
                this.toastService.showError('Bad');
            }
        }
    }

    doContinue(): void {
        this.isLoser = false;
        this.reset();
    }

    reset(): void {
        this.answer = "";
        this.clearTimeout();
        this.countDown();
        this.setValue(++this.position);
    }

    setFocus(): void {
        if (!this.isLoser)
            this.answerInput.nativeElement.focus();
    }
}
