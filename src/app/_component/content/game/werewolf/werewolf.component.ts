import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { GamerResponse, VoteInfo } from "../../../../_model/gamer.model";
import { Constants } from "../../../../_common/constant";
import { CookieService } from "../../../../_service/cookie.service";
import { GamerInfo, PublicMsg } from "../../../../_model/socket.model";
import { Router, ActivatedRoute } from "@angular/router";
import { ISubscription } from "rxjs/Subscription";
import { ToastService } from "../../../../_service/toast.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ModalCharacter } from "../../../modal/modal-character/modal-character.component";
import { NspRoomService } from "../../../../_service/socket.nsp.room.service";
import { NgForm } from "@angular/forms";

@Component({
  selector: "game-werewolf",
  templateUrl: "./werewolf.component.html",
  styleUrls: ["./werewolf.component.css"]
})
export class WerewolfComponent implements OnInit {

  @ViewChild("formPublicMsg") formPublicMsg: NgForm;
  @ViewChild("formPrivateMsg") formPrivateMsg: NgForm;

  @ViewChild('publicMsg') publicMsg: ElementRef;
  @ViewChild('privateMsg') privateMsg: ElementRef;

  @ViewChild('divPublicMsg') divPublicMsg: ElementRef;

  private isActive = true;

  private arrGamer: Array<GamerInfo>;

  private arrInfoVote: Array<VoteInfo>;

  private styletransparent = null;

  private noname = "undefined";

  private timeViewCharacter: any;

  private timeRound: any;

  private ttlOfRound = Constants.TIME_TO_LIE_OF_ROUND;

  private minutesOfRound = "00";

  private secondOfRound = "00";

  private image_cupid = "../../../../assets/img-werewolf/character/card-cupid.png";

  private observerGetDetailRoom: ISubscription;

  private modalRef: BsModalRef;

  private arrCharacters = ["cupid", "fortuneteller", "huntsman", "sheriff", "townsfolk", "werewolf", "witch"];

  private gamerResponse: GamerResponse;

  private observerGetPublicMsg: ISubscription;

  private arrPublicMsg: Array<PublicMsg>;

  constructor(
    private cookieService: CookieService,
    private toastService: ToastService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private modalService: BsModalService,
    private nspRoomService: NspRoomService
  ) { }
  viewCharacter(i) {
    console.log("view character. : ", i);
    this.isActive = !this.isActive;
    this.arrGamer[i].is_view = !this.arrGamer[i].is_view;

    this.timeViewCharacter = setTimeout(() => {
      if (this.arrGamer[i].is_view) {
        this.arrGamer[i].is_view = !this.arrGamer[i].is_view;
      }
    }, 3000);
  }

  ngOnInit(): void {
    // this.init();

    this.listenerDetailRoom();

    this.listenerPublicMsg();

    let token = this.cookieService.getValue(Constants.COOKIE_TOKEN_NAME);
    if (token) {
      this.setInfoGamerResponse();
      this.joinRoom();
    } else {
      this.toastService.showError("You must to login");
      this.router.navigate(["/game/lobby"]);
    }
  }

  setInfoGamerResponse(): void {
    this.gamerResponse = new GamerResponse();
    this.gamerResponse._id = this.cookieService.getValue(Constants.COOKIE_ID);
    this.gamerResponse.email = this.cookieService.getValue(Constants.COOKIE_EMAIL);
    this.gamerResponse.fullname = this.cookieService.getValue(Constants.COOKIE_FULLNAME);
    this.gamerResponse.avatar_url = this.cookieService.getValue(Constants.COOKIE_AVATAR_URL);

  }

  // litener
  listenerPublicMsg(): void {
    this.observerGetPublicMsg = this.nspRoomService.getPublicMessage().subscribe(
      res => {
        if (res.result == Constants.RESULT_SUCCESS) {
          this.arrPublicMsg = res.value;
        }
      },
      error => {
        console.log(error);
      })
  }

  listenerDetailRoom(): void {
    this.observerGetDetailRoom = this.nspRoomService.getDetailRoom().subscribe(
      res => {
        if (res.result == Constants.RESULT_SUCCESS) {
          this.arrGamer = res.value.arrGamer;
        } else {
          this.toastService.showError(res.message);
          this.router.navigate(["/game/lobby"]);
        }
        console.log("res detail : ", res);
      },
      error => {
        console.log(error);
      }
    );
  }


  nextRound(): void {
    this.ttlOfRound = Constants.TIME_TO_LIE_OF_ROUND;
    this.timeRound = setInterval(() => {
      let minute = Math.floor(this.ttlOfRound / 60);
      let second = this.ttlOfRound % 60;

      this.minutesOfRound = minute >= 10 ? minute + "" : "0" + minute;
      this.secondOfRound = second >= 10 ? second + "" : "0" + second;

      if (this.ttlOfRound == 0) {
        clearInterval(this.timeRound);
      }

      --this.ttlOfRound;
    }, 1000);
  }

  vote(index) {
    console.log(this.arrGamer);
    let _id = this.cookieService.getValue(Constants.COOKIE_ID);
    let gamer = this.arrGamer[index];
    if (gamer._id == _id) {
    }
    // let gamerId = gamer._id;
  }

  joinRoom(): void {
    let gamerInfo = new GamerInfo();
    gamerInfo._id = this.cookieService.getValue(Constants.COOKIE_ID);
    gamerInfo.email = this.cookieService.getValue(Constants.COOKIE_EMAIL);
    gamerInfo.fullname = this.cookieService.getValue(Constants.COOKIE_FULLNAME);
    gamerInfo.avatar_url = this.cookieService.getValue(Constants.COOKIE_AVATAR_URL);

    let nameRoom = this.activateRouter.snapshot.queryParamMap.get("name_room");

    let obj = { nameRoom, gamerInfo };

    console.log("obj Join : ", obj);

    // emit
    this.nspRoomService.joinRoom(obj);
  }

  openModal() {
    console.log("start game clicked...");
    this.openModalCharacter();
  }

  // open modal select character
  openModalCharacter(): void {
    const initialState = {
      arrCharacters: this.arrCharacters,

      title: "Customize Game"
    };
    this.modalRef = this.modalService.show(ModalCharacter, { initialState, backdrop: "static" });
    this.modalRef.content.closeBtnName = "Close";
    this.modalRef.content.confirmBtnName = "Confirm";
  }

  ngOnDestroy(): void {
    this.observerGetDetailRoom.unsubscribe();
    this.observerGetPublicMsg.unsubscribe();
  }

  // handle chat
  onKey(event: KeyboardEvent) {
    if (event.keyCode == 13 && event.shiftKey == false) {
      this.publicMsg.nativeElement.focus();
      this.sendPublicMsg();
      this.formPublicMsg.reset();
      console.log("aaaaaaaaaaaaaaaaaaaaaaa");
      window.setTimeout(() => {
        this.setScoll();
      }, 10)
    } else if (event.keyCode == 13 && event.shiftKey == true) {

    }
  }

  sendPublicMsg(): void {
    console.log("form public : ", this.formPublicMsg.value);

    let content = this.formPublicMsg.value.content;
    if (content) {
      let objPublicMsg = new PublicMsg();
      objPublicMsg.content = content;
      objPublicMsg.sender = this.gamerResponse;
      objPublicMsg.create_at = new Date();

      console.log("publicmsg : ", objPublicMsg);
      this.nspRoomService.sendPublicMessage(objPublicMsg);

      

    }
  }


  sendPrivateMsg(): void {
    console.log("form private : ", this.formPrivateMsg.value);
  }

  setScoll(): void {
    this.divPublicMsg.nativeElement.scrollTop = this.divPublicMsg.nativeElement.scrollHeight;
  }




}
