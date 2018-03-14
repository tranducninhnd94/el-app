import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subject } from "rxjs/Subject";
import { Constants } from "../_common/constant";
import {
  SystemPublicMsgResponse,
  GamerInfo,
  Room,
  SystemResponse,
  PublicMsg,
  PrivateMsg,
  CoundDown,
  GamerAction
} from "../_model/socket.model";

@Injectable()
export class NspRoomService {
  private socket = io(Constants.URL_NAMESPACE_ROOM);
  private Observer: Observable<any>;

  constructor() { }

  getPublicMessage(): Observable<SystemResponse<Array<PublicMsg>>> {
    let observable = new Observable<SystemResponse<Array<PublicMsg>>>(observer => {
      this.socket.on(Constants.SERVER_PUBLIC_MESSAGE, res => {
        observer.next(res);
      });
    });
    return observable;
  }

  getPrivateMessage(): Observable<SystemResponse<Array<PrivateMsg>>> {
    let observable = new Observable<SystemResponse<Array<PrivateMsg>>>(observer => {
      this.socket.on(Constants.SERVER_PRIVATE_MESSAGE, res => {
        observer.next(res);
      });
    });
    return observable;
  }

  getSystemPublicMessage(): Observable<SystemPublicMsgResponse> {
    let observable = new Observable<SystemPublicMsgResponse>(observer => {
      this.socket.on(Constants.SERVER_SYSTEM_PUBLIC_MESSAGE, res => {
        observer.next(res);
      });
    });
    return observable;
  }

  getDetailRoom(): Observable<SystemResponse<Room>> {
    let observable = new Observable<SystemResponse<Room>>(observer => {
      this.socket.on(Constants.SERVER_SEND_DETAIL_ROOM, res => {
        observer.next(res);
      });
    });
    return observable;
  }

  sk_getStartGame(): Observable<SystemResponse<Room>> {
    let observable = new Observable<SystemResponse<Room>>(observer => {
      this.socket.on(Constants.SERVER_START_GAME, res => {
        observer.next(res);
      });
    });
    return observable;
  }

  sk_getInfoFirstVoteByRound(): Observable<SystemResponse<any>> {
    let observable = new Observable<SystemResponse<any>>(observer => {
      this.socket.on(Constants.SERVER_SEND_INFO_FIRST_VOTE_BY_ROUNF, res => {
        observer.next(res);
      });
    });
    return observable;
  }

  sk_getCountDown(): Observable<CoundDown> {
    let observable = new Observable<CoundDown>(observer => {
      this.socket.on(Constants.SERVER_SEND_COUND_DOWN, res => {
        observer.next(res);
      });
    });
    return observable;
  }

  sk_getActionOfGamer(): Observable<GamerAction> {
    let observable = new Observable<GamerAction>(observer => {
      this.socket.on(Constants.SERVER_SEND_ACTION, res => {
        observer.next(res);
      });
    });
    return observable;
  }

  sendPublicMessage(obj: any): void {
    this.socket.emit(Constants.CLIENT_PUBLIC_MESSAGE, obj);
  }

  sendPrivateMessage(privateMsg: PrivateMsg): void {
    this.socket.emit(Constants.CLIENT_PRIVATE_MESSAGE, privateMsg);
  }

  sendInformation(gamerInfo: GamerInfo): void {
    this.socket.emit(Constants.CLIENT_INFORMATION, gamerInfo);
  }

  createRoom(newRoom: Room) {
    this.socket.emit(Constants.CLIENT_CREATE_ROOM, newRoom);
  }

  // obj = {nameRoom : name_room, gamerInfo: gamerInfo}
  joinRoom(obj: any) {
    this.socket.emit(Constants.CLIENT_JOIN_ROOM, obj);
  }

  sk_startGame(obj: any) {
    this.socket.emit(Constants.CLIENT_START_GAME, obj);
  }

  sk_sendFirstVote(obj: any) {
    this.socket.emit(Constants.CLIENT_FIRST_VOTE, obj);
  }

  sk_getInfoFirstVote(obj: any) {
    this.socket.emit(Constants.CLIENT_GET_INFO_FIRST_VOTE_BY_ROUND, obj);
  }

  sk_sendAction(obj: any) {
    this.socket.emit(Constants.CLIENT_SEND_ACTION, obj);
  }
}
