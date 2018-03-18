import { Injectable } from "@angular/core";
import * as io from "socket.io-client";
import { Observable } from "rxjs/Observable";
import { Observer } from "rxjs/Observer";
import { Subject } from "rxjs/Subject";
import { Constants } from "../_common/constant";
import { SystemPublicMsgResponse, GamerInfo, Room, SystemResponse } from "../_model/socket.model";

@Injectable()
export class NspLobbyService {
  private socket = io(Constants.URL_NAMESPACE_LOBBY);
  private Observer: Observable<any>;

  constructor() {}

  getMsgCreateRoom(): Observable<SystemResponse<any>> {
    let observable = new Observable<SystemResponse<any>>(observer => {
      this.socket.on(Constants.SERVER_NOTIEC_CREATE_ROOM, res => {
        observer.next(res);
      });
    });
    return observable;
  }

  getAllRoom(): Observable<SystemResponse<Array<Room>>> {
    let observable = new Observable<SystemResponse<Array<Room>>>(observer => {
      this.socket.on(Constants.SERVER_GET_ALL_ROOM, res => {
        observer.next(res);
      });
    });
    return observable;
  }

  createRoom(newRoom: Room) {
    this.socket.emit(Constants.CLIENT_CREATE_ROOM, newRoom);
  }

  sk_clientGetAllRoom(obj): void {
    this.socket.emit(Constants.CLIENT_GET_ALL_ROOM, obj);
  }
}
