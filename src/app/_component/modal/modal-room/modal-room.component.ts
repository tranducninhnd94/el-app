import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from "@angular/core";
import { BsModalRef } from "ngx-bootstrap/modal/bs-modal-ref.service";
import { FormControl } from "@angular/forms";
import { CookieService } from "../../../_service/cookie.service";
import { Constants } from "../../../_common/constant";
import { ToastService } from "../../../_service/toast.service";
import { Room, GamerInfo } from "../../../_model/socket.model";
import { ISubscription } from "rxjs/Subscription";
import { ModalService } from "../../../_service/modal.service";
import { Router } from "@angular/router";
import { NspLobbyService } from "../../../_service/socket.nsp.lobby.service";

@Component({
  selector: "modal-room",
  templateUrl: "./modal-room.component.html"
})
export class ModalRoom implements OnInit, OnDestroy {
  @ViewChild("roomForm") roomForm: FormControl;

  private observerGetMsgCreateRoom: ISubscription;

  private observerGetAllRoom: ISubscription;

  constructor(
    public bsModalRef: BsModalRef,
    private cookieService: CookieService,
    private toastService: ToastService,
    private modalService: ModalService,
    private router: Router,
    private nspLobbyService: NspLobbyService
  ) { }

  ngOnInit(): void {
    this.observerGetMsgCreateRoom = this.nspLobbyService.getMsgCreateRoom().subscribe(
      res => {
        if (res.result == Constants.RESULT_SUCCESS) {
          this.toastService.showSuccess(res.message);
          this.bsModalRef.hide();
        } else {
          this.toastService.showError(res.message);
        }
      },
      error => {
        console.log("error when create room :", error);
      }
    );
  }

  doCreateRoom() {
    console.log("do create room");
    // check isLogin
    let token = this.cookieService.getValue(Constants.COOKIE_TOKEN_NAME);
    if (token) {
      let _id = this.cookieService.getValue(Constants.COOKIE_ID);
      let email = this.cookieService.getValue(Constants.COOKIE_EMAIL);
      let fullname = this.cookieService.getValue(Constants.COOKIE_FULLNAME);
      let avatar_url = this.cookieService.getValue(Constants.COOKIE_AVATAR_URL);
      let gamerReq = { _id, email, fullname, avatar_url };

      let newRoom = new Room();
      let nameRoom = this.roomForm.value.nameRoom;
      let passRoom = this.roomForm.value.passwordRoom;
      newRoom.name_room = nameRoom;
      newRoom.password = passRoom;
      newRoom.create_at = new Date();
      newRoom.owner = gamerReq;

      let arrGamer = new Array<GamerInfo>();
      newRoom.arrGamer = arrGamer;

      console.log("new room : ", newRoom);

      this.nspLobbyService.createRoom(newRoom);

      this.bsModalRef.hide();

      this.router.navigate(["/game/werewolf"], { queryParams: { name_room: nameRoom } });
    } else {
      this.toastService.showError("You must to login!");
    }
  }

  ngOnDestroy(): void {
    this.observerGetMsgCreateRoom.unsubscribe();
  }
}
