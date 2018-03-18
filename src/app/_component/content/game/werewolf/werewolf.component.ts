import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from "@angular/core";
import { GamerResponse, VoteInfo } from "../../../../_model/gamer.model";
import { Constants } from "../../../../_common/constant";
import { CookieService } from "../../../../_service/cookie.service";
import { GamerInfo, PublicMsg, PrivateMsg } from "../../../../_model/socket.model";
import { Router, ActivatedRoute } from "@angular/router";
import { ISubscription } from "rxjs/Subscription";
import { ToastService } from "../../../../_service/toast.service";
import { BsModalRef, BsModalService } from "ngx-bootstrap/modal";
import { ModalCharacter } from "../../../modal/modal-character/modal-character.component";
import { ModalVote } from "../../../modal/modal-vote/modal-vote.component";
import { NspRoomService } from "../../../../_service/socket.nsp.room.service";
import { NgForm } from "@angular/forms";
import { Action } from "../../../../_model/enum.model";

@Component({
  selector: "game-werewolf",
  templateUrl: "./werewolf.component.html",
  styleUrls: ["./werewolf.component.css"]
})
export class WerewolfComponent implements OnInit {
  @ViewChild("formPublicMsg") formPublicMsg: NgForm;
  @ViewChild("formPrivateMsg") formPrivateMsg: NgForm;

  @ViewChild("publicMsg") publicMsg: ElementRef;
  @ViewChild("privateMsg") privateMsg: ElementRef;

  @ViewChild("divPublicMsg") divPublicMsg: ElementRef;
  @ViewChild("divPrivateMsg") divPrivateMsg: ElementRef;

  private gameStarted: boolean = false;

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

  private observerStartGame: ISubscription;

  private observerGetFirstVote: ISubscription;

  private observerGetCountDown: ISubscription;

  private observerGetAction: ISubscription;

  private observerGetInfoAfterNight: ISubscription;

  private observerGetPrivareMsg: ISubscription;

  private arrPublicMsg: Array<PublicMsg>;

  private nameOfRoom: string;

  private prefixSrc = "../../../../assets/img-werewolf/character/card-";

  private sufixSrc = ".png";

  private defaultSrc = "../../../../assets/img-werewolf/character/stardust.png";

  private meInfo: GamerInfo;

  private numViewCharacter = 1; // fortuneteller

  private numPin = 1; // hunter

  private numbite = 1; // wolf

  private numSave = 1;

  private numEliminate = 1;

  private firstVoteNumYes = 0;

  private firstVoteNumNo = 0;

  private titleCountdown = "In Round";

  private ttl = 0;

  private isInRound: boolean = false;

  private isInFirstVote: boolean = false;

  private isInSecondVote: boolean = false;

  private actionGamer: Action;

  private victim: GamerInfo;

  private valueDefault = "undefined";

  private arrPrivateMsg : Array<PrivateMsg>;


  constructor(
    private cookieService: CookieService,
    private toastService: ToastService,
    private router: Router,
    private activateRouter: ActivatedRoute,
    private modalService: BsModalService,
    private nspRoomService: NspRoomService
  ) {}
  viewCharacter(i) {
    console.log("view character. : ", i);
    console.log("game started . : ", this.gameStarted);
    if (this.gameStarted) {
      let character = this.meInfo.character;
      if (character != "fortuneteller") {
        this.toastService.showError("You aren't  fortuneteller");
      } else if (this.numViewCharacter == 1) {
        this.isActive = !this.isActive;
        this.arrGamer[i].is_view = !this.arrGamer[i].is_view;
        this.numViewCharacter = 0;
        this.timeViewCharacter = setTimeout(() => {
          if (this.arrGamer[i].is_view) {
            this.arrGamer[i].is_view = !this.arrGamer[i].is_view;
          }
        }, 3000);
      } else {
        this.toastService.showError("Out of view");
      }
    } else {
      this.isActive = !this.isActive;
      this.arrGamer[i].is_view = !this.arrGamer[i].is_view;

      this.timeViewCharacter = setTimeout(() => {
        if (this.arrGamer[i].is_view) {
          this.arrGamer[i].is_view = !this.arrGamer[i].is_view;
        }
      }, 3000);
    }
  }

  ngOnInit(): void {
    // this.init();

    this.listenerGetPrivateMsg();

    this.listenerGetAction();

    this.listenerGetFirstVote();

    this.listenerDetailRoom();

    this.listenerPublicMsg();

    this.listenerStartGame();

    this.listenerGetCountDown();

    this.listenerGetInFoAfterNight();

    let token = this.cookieService.getValue(Constants.COOKIE_TOKEN_NAME);
    if (token) {
      this.setInfoGamerResponse();
      this.joinRoom();
    } else {
      this.toastService.showError("You must to login");
      this.router.navigate(["/game/lobby"]);
    }
  }

  getInfoMe(): void {
    let _id = this.cookieService.getValue(Constants.COOKIE_ID);
    this.meInfo = this.arrGamer.find(gamer => {
      return gamer._id == _id;
    });
  }

  setInfoGamerResponse(): void {
    this.gamerResponse = new GamerResponse();
    this.gamerResponse._id = this.cookieService.getValue(Constants.COOKIE_ID);
    this.gamerResponse.email = this.cookieService.getValue(Constants.COOKIE_EMAIL);
    this.gamerResponse.fullname = this.cookieService.getValue(Constants.COOKIE_FULLNAME);
    this.gamerResponse.avatar_url = this.cookieService.getValue(Constants.COOKIE_AVATAR_URL);
  }

  // litener

  listenerGetPrivateMsg(): void {
    this.observerGetPrivareMsg = this.nspRoomService.getPrivateMessage().subscribe(
      res => {
        console.log("private arr : ", res);
        if (res.result == Constants.RESULT_SUCCESS){
          let value = res.value;

          let character= value.character;
          let arrPrivateMsg = value.arrPrivateMsg;

          if (character == this.meInfo.character){
            this.arrPrivateMsg = arrPrivateMsg;
            console.log("arr : ", this.arrPrivateMsg);
          }

        }
      },
      error => {
        console.log(error);
      }
    );
  }

  listenerGetInFoAfterNight(): void {
    this.observerGetInfoAfterNight = this.nspRoomService.sk_getInfoAfterNightForServer().subscribe(
      res => {
        console.log("after night : ", res);
        this.arrGamer = res.arrGamer;

        this.toastService.showInfo("The vote will come to 3 second !", { toastLife: 3000 });
        let timeOut = setTimeout(() => {
          this.nspRoomService.sk_openFirstVote({ nameRoom: this.nameOfRoom });
        }, 4000);
      },
      error => {
        console.log(error);
      }
    );
  }

  listenerGetAction(): void {
    this.observerGetAction = this.nspRoomService.sk_getActionOfGamer().subscribe(
      res => {
        console.log("action response: ", res);
        this.actionGamer = res.action;
        this.victim = res.victim;
      },
      error => {
        console.log(error);
      }
    );
  }

  private isNextRound = false;
  listenerGetCountDown(): void {
    this.observerGetCountDown = this.nspRoomService.sk_getCountDown().subscribe(
      res => {
        console.log(res);
        this.titleCountdown = res.name;
        this.ttlOfRound = res.ttl;
        this.isInRound = res.isInRound;
        this.isInFirstVote = res.isInFirstVote;
        this.isInSecondVote = res.isInSecondVote;

        let minute = Math.floor(this.ttlOfRound / 60);
        let second = this.ttlOfRound % 60;

        this.minutesOfRound = minute >= 10 ? minute + "" : "0" + minute;
        this.secondOfRound = second >= 10 ? second + "" : "0" + second;

        // end of phase
        if (this.ttlOfRound == 0 && this.isInRound) {
          this.nspRoomService.sk_getInfoAfterNight({ nameRoom: this.nameOfRoom });
        } else if (this.ttlOfRound == 0 && this.isInFirstVote) {
          if (this.firstVoteNumYes > this.firstVoteNumNo) {
            // co giet // call second vote
            this.toastService.showInfo("Let kill someone after 3 second ! !", { toastLife: 3000 });
            let timeOut = setTimeout(() => {
              this.nspRoomService.sk_openSecondVote({ nameRoom: this.nameOfRoom });
            }, 4000);
          } else {
            this.isNextRound = true;
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  listenerGetFirstVote(): void {
    this.observerGetFirstVote = this.nspRoomService.sk_getInfoFirstVoteByRound().subscribe(
      res => {
        // format: {roomName, arrVote : [{gamer, answer}]}
        console.log(res);
        if (res.result == Constants.RESULT_SUCCESS) {
          this.firstVoteNumYes = 0;
          this.firstVoteNumNo = 0;
          let arrVote = res.value.arrVote;
          arrVote.forEach(tmp => {
            if (tmp.answer == 1) {
              this.firstVoteNumYes += 1;
            } else {
              this.firstVoteNumNo += 1;
            }
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  listenerPublicMsg(): void {
    this.observerGetPublicMsg = this.nspRoomService.getPublicMessage().subscribe(
      res => {
        console.log("recieve : ", res);
        if (res.result == Constants.RESULT_SUCCESS) {
          this.arrPublicMsg = res.value;
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  listenerDetailRoom(): void {
    this.observerGetDetailRoom = this.nspRoomService.getDetailRoom().subscribe(
      res => {
        if (res.result == Constants.RESULT_SUCCESS) {
          if (res.value) {
            this.arrGamer = res.value.arrGamer;
            this.getInfoMe();
          }
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

  listenerStartGame(): void {
    this.observerStartGame = this.nspRoomService.sk_getStartGame().subscribe(
      res => {
        if (res.result == Constants.RESULT_SUCCESS) {
          this.gameStarted = res.value.is_started;
          this.arrGamer = res.value.arrGamer;
          this.round = res.value.round;
          this.getInfoMe();
        } else {
          this.toastService.showError(res.message);
          this.router.navigate(["/game/lobby"]);
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  nextRound(): void {
    // return numViewCharacter
    this.firstVoteNumNo = 0;
    this.firstVoteNumYes = 0;
    this.nspRoomService.sk_clientNextRound({ nameRoom: this.nameOfRoom });
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

    this.nameOfRoom = nameRoom;

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
    let arr = [];
    this.arrCharacters.forEach(character => {
      let tmp = { name: character, quantity: 0, checked: false };
      arr.push(tmp);
    });

    const initialState = {
      arrCharacters: arr,
      totalGamer: this.arrGamer.length,
      title: "Customize Game",
      nameRoom: this.nameOfRoom
    };
    this.modalRef = this.modalService.show(ModalCharacter, { initialState, backdrop: "static" });
    this.modalRef.content.closeBtnName = "Close";
    this.modalRef.content.confirmBtnName = "Confirm";
  }

  ngOnDestroy(): void {
    this.observerGetDetailRoom.unsubscribe();
    this.observerGetPublicMsg.unsubscribe();
    this.observerStartGame.unsubscribe();
    this.observerGetFirstVote.unsubscribe();
    this.observerGetCountDown.unsubscribe();
    this.observerGetAction.unsubscribe();
    this.observerGetInfoAfterNight.unsubscribe();
    this.observerGetPrivareMsg.unsubscribe();
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
      }, 10);
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
      this.nspRoomService.sendPublicMessage({ objPublicMsg, nameRoom: this.nameOfRoom });
    }
  }

  onKeyPrivate(event: KeyboardEvent) {
    if (event.keyCode == 13 && event.shiftKey == false) {
      if (this.meInfo.character) {
        this.privateMsg.nativeElement.focus();
        this.sendPrivateMsg();
        this.formPrivateMsg.reset();
        window.setTimeout(() => {
          this.setScollPrivateDiv();
        }, 10);
      } else {
        this.formPrivateMsg.reset();
        this.toastService.showError("Using when game started!");
      }
    } else if (event.keyCode == 13 && event.shiftKey == true) {
    }
  }

  sendPrivateMsg(): void {
    console.log("form private : ", this.formPrivateMsg.value);
    let content = this.formPrivateMsg.value.content;
    if (content) {
      let objPrivateMsg = new PublicMsg();
      objPrivateMsg.content = content;
      objPrivateMsg.sender = this.gamerResponse;
      objPrivateMsg.create_at = new Date();

      console.log("objPrivateMsg : ", objPrivateMsg);
      this.nspRoomService.sendPrivateMessage({
        objPrivateMsg,
        nameRoom: this.nameOfRoom,
        character: this.meInfo.character
      });
    }
  }

  setScoll(): void {
    this.divPublicMsg.nativeElement.scrollTop = this.divPublicMsg.nativeElement.scrollHeight;
  }

  setScollPrivateDiv(): void {
    this.divPrivateMsg.nativeElement.scrollTop = this.divPrivateMsg.nativeElement.scrollHeight;
  }

  // leave

  leaveRoom() {}

  // modal vote

  showModalVote() {
    const initialState = {
      title: "Vote Dialog",
      nameRoom: this.nameOfRoom,
      meInfo: this.meInfo
    };
    this.modalRef = this.modalService.show(ModalVote, { initialState, backdrop: "static" });
    this.modalRef.content.closeBtnName = "Close";
    this.modalRef.content.confirmBtnName = "Confirm";
  }

  // confirm vote
  private answerFirstVote = 1;
  // private styleVote1 = { "pointer-events": "none", opacity: "0.4" };

  private styleGamerDie = { "pointer-events": "none", opacity: "0.4", color: "red" };

  private round: number = 1;
  private countdownFirstVote = Constants.TIME_TO_LIE_OF_FIRST_VOTE;

  onSelectionChange(value) {
    console.log("change..", value);
    if (value == "yes") this.answerFirstVote = 1;
    else this.answerFirstVote = 0;

    let objVote = {
      // round: this.round,
      infoVote: { gamer: this.meInfo, answer: this.answerFirstVote },
      roomName: this.nameOfRoom
    };
    // this.styleVote1 = { "pointer-events": "none", opacity: "0.4" };
    this.nspRoomService.sk_sendFirstVote(objVote);
    console.log("objVote : ", objVote);
  }

  // action of gamer
  doPinAction(index) {
    console.log("pin action : ");
    let action = "PIN";
    let character = this.meInfo;
    let victim = this.arrGamer[index];

    let obj = { nameRoom: this.nameOfRoom, character, action, victim };

    this.nspRoomService.sk_sendAction(obj);
  }

  doProtectAction(index) {
    let action = "PROTECT";
    let character = this.meInfo;
    let victim = this.arrGamer[index];

    let obj = { nameRoom: this.nameOfRoom, character, action, victim };
    console.log("action", obj);
    this.nspRoomService.sk_sendAction(obj);
  }

  doEnvenomAction(index) {
    let action = "ENVENOM";
    let character = this.meInfo;
    let victim = this.arrGamer[index];

    let obj = { nameRoom: this.nameOfRoom, character, action, victim };
    console.log("action", obj);
    this.nspRoomService.sk_sendAction(obj);
  }

  doSaveAction(index) {
    let action = "SAVE";
    let character = this.meInfo;
    let victim = this.arrGamer[index];

    let obj = { nameRoom: this.nameOfRoom, character, action, victim };
    console.log("action", obj);
    this.nspRoomService.sk_sendAction(obj);
  }

  doBiteAction(index) {
    let action = "BITE";
    let character = this.meInfo;
    let victim = this.arrGamer[index];

    let obj = { nameRoom: this.nameOfRoom, character, action, victim };
    console.log("action", obj);
    this.nspRoomService.sk_sendAction(obj);
  }

  doKillAction(index) {
    let action = "PIN";
    let character = this.meInfo;
    let victim = this.arrGamer[index];

    let obj = { nameRoom: this.nameOfRoom, character, action, victim };
    console.log("action", obj);
    this.nspRoomService.sk_sendAction(obj);
  }

  testToast() {
    this.toastService.showInfo("message", { toastLife: 1000 });
    // this.toastService.showCustom();
  }
}
// [{nameRoom : ? , info : {round : round: ?,  arrVote : {gamer: ?, answer}}}]
