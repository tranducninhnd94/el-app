import {
  Component,
  TemplateRef,
  OnInit,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from "@angular/core";
import { BsModalService } from "ngx-bootstrap/modal";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";

import { WordService } from "../../_service/word.service";
import { ToastService } from "../../_service/toast.service";

import { ArrayObject } from "../../_model/response/arr.res";
import { WordResponse } from "../../_model/response/word.res";
import { Constants } from "../../_common/constant";
import { TopicService } from "../../_service/topic.service";
import { ModalSelect } from "../modal/modal-select/modal-select.component";
import { TopicResponse } from "../../_model/response/topic.res";
import { Subscription } from "rxjs/Subscription";
import { ModalService } from "../../_service/modal.service";

@Component({
  selector: "practice-partial",
  templateUrl: "./practice.component.html",
  styleUrls: ["./practice.component.css"]
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class PracticeComponent implements OnInit, AfterViewInit {
  @ViewChild("audioElement") audioElement: ElementRef;

  @ViewChild("audioplayersource") audioplayersource: ElementRef;

  @ViewChild("answerInput") answerInput: ElementRef;

  private subscription: Subscription;

  private modalRef: BsModalRef;

  private serverHost = Constants.SERVER_HOST;

  private time = 0;

  private isFocus = true;

  private resetTime = true;

  private answer = "";

  private wordsRes: ArrayObject<Array<WordResponse>>;

  private topicsRes: ArrayObject<Array<TopicResponse>>;

  private words: Array<WordResponse>;

  private topics: Array<TopicResponse>;

  private optionTopics: Array<any> = new Array<any>();

  private position = 0;

  private word: WordResponse;

  private isLoser = false;

  private myVar: any;

  private Sourcelink = "";

  private question = "";

  private TIME_CONSTANT = 15;

  constructor(
    private modalService: BsModalService,
    private wordService: WordService,
    private topicService: TopicService,
    private toastService: ToastService,
    private modalCustomService: ModalService
  ) {
    this.time = this.TIME_CONSTANT;
    console.log("position: ", this.position);
  }

  ngOnInit(): void {
    this.getAllTopic();

    setTimeout(() => {
      this.openModalSelect();
    }, 100);
    this.isLoser = false;
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
    this.getValueFromModal();

    if (this.myVar) {
      this.clearTimeout();
    }
  }

  getAllWords(): void {
    this.wordService.getAll().subscribe(
      response => {
        if (response.result == 200) {
          this.wordsRes = response.value;
          this.words = this.wordsRes.list;
        }
        this.setValue(this.position);
      },
      error => {
        console.log("error: ", error);
      }
    );
  }

  getAllTopic(): void {
    this.topicService.getAllTopic().subscribe(
      res => {
        if (res.result == 200) {
          this.topics = res.value.list;
          this.setOptionTopics();
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  getWordsByIdsTopic(arrIds): void {
    this.wordService.getByIdTopic(arrIds).subscribe(
      response => {
        if (response.result == 200) {
          this.wordsRes = response.value;
          this.words = this.wordsRes.list;
        }
        this.setValue(this.position);
      },
      error => {
        console.log(error);
      }
    );
  }

  setValue(i): void {
    this.clearTimeout();

    if (i >= 0 && i < this.wordsRes.total) {
      this.word = this.words[i];
      this.question = this.word.vocabulary;
      this.Sourcelink = this.serverHost + this.word.audio.audio_url;
      this.audioElement.nativeElement.load();
      setTimeout(() => {
        this.audioElement.nativeElement.play();
      }, 1000);
    }else{
      this.clearTimeout;
    }
    this.countDown();
  }

  onKey(event: KeyboardEvent) {
    if (this.isFocus == true && event.keyCode == 13 && event.shiftKey == false) {
      if (this.answer.trim() == this.word.name.trim()) {
        this.toastService.showSuccess("Good");
        this.reset();
      } else {
        this.toastService.showError("Bad");
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
    if (!this.isLoser) this.answerInput.nativeElement.focus();
  }

  // openModalWithComponent() {
  //   const initialState = {
  //     arrTopics: this.topics,

  //     title: "Modal with component"
  //   };
  //   this.modalRef = this.modalService.show(ModalSelect, { initialState, class: "modal-lg", backdrop: "static" });
  //   this.modalRef.content.closeBtnName = "Close";
  // }

  openModalSelect(): void {
    const initialState = {
      arrTopics: this.optionTopics,

      title: "Modal with component"
    };
    this.modalRef = this.modalService.show(ModalSelect, { initialState, class: "modal-lg", backdrop: "static" });
    this.modalRef.content.closeBtnName = "Close";
    this.modalRef.content.confirmBtnName = "Confirm";
  }

  ngOnDestroy(): void {
    this.modalCustomService.clearData();
  }

  setOptionTopics(): void {
    if (this.topics) {
      this.topics.forEach(topic => {
        let tmp: any;
        tmp = topic;
        tmp.checked = false;
        this.optionTopics.push(tmp);
      });
    }
    console.log(this.optionTopics);
  }

  getValueFromModal(): void {
    this.subscription = this.modalCustomService.getData().subscribe(
      data => {
        this.modalRef.hide();
        this.getWordsByIdsTopic(data);
        // get all words
        // this.getAllWords();
      },
      error => {
        console.log("error", error);
      }
    );
  }
}
