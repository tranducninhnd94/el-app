import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { BsModalService, BsModalRef } from "ngx-bootstrap/modal";
import { ModalRoom } from "../../../modal/modal-room/modal-room.component";
// import { SocketService } from "../../../../_service/socket.service";
import { ISubscription } from "rxjs/Subscription";
import { Constants } from "../../../../_common/constant";
import { Room, GamerInfo } from "../../../../_model/socket.model";
import { CookieService } from "../../../../_service/cookie.service";
import { NspLobbyService } from "../../../../_service/socket.nsp.lobby.service";

@Component({
  selector: "game-lobby",
  templateUrl: "./lobby.component.html",
  styleUrls: ["./lobby.component.css"]
})
export class LobbyComponent implements OnInit, OnDestroy, AfterViewInit {
  private modalRef: BsModalRef;

  private observerGetAllRoom: ISubscription;

  private arrRoom: Array<Room>;

  constructor(
    private bsModalService: BsModalService,
    // private socketService: SocketService,
    private cookieService: CookieService,
    private nspLobbyService: NspLobbyService
  ) {}

  ngOnInit(): void {
    this.nspLobbyService.sk_clientGetAllRoom({});

    this.observerGetAllRoom = this.nspLobbyService.getAllRoom().subscribe(
      res => {
        if (res.result == Constants.RESULT_SUCCESS) {
          this.arrRoom = res.value;
        }
        console.log("array room : ", this.arrRoom);
      },
      error => {
        console.log(error);
      }
    );
  }

  ngAfterViewInit(): void {
    // send messager
    // this.sendInformation();
  }

  // send information gamer
  // sendInformation(): void {
  //   let token = this.cookieService.getValue(Constants.COOKIE_TOKEN_NAME);
  //   if (token) {
  //     let gameInfo = new GamerInfo();

  //     gameInfo._id = this.cookieService.getValue(Constants.COOKIE_ID);
  //     gameInfo.email = this.cookieService.getValue(Constants.COOKIE_EMAIL);
  //     gameInfo.fullname = this.cookieService.getValue(Constants.COOKIE_FULLNAME);
  //     gameInfo.avatar_url = this.cookieService.getValue(Constants.COOKIE_AVATAR_URL);

  //     // this.socketService.sendInformation(gameInfo);
  //   }
  // }

  showModalRoom() {
    this.modalRef = this.bsModalService.show(ModalRoom, { backdrop: "static" });
  }

  ngOnDestroy(): void {
    console.log("unsubscribe");
    this.observerGetAllRoom.unsubscribe();
  }
}
