// import { Injectable } from "@angular/core";
// import * as io from "socket.io-client";
// import { Observable } from "rxjs/Observable";
// import { Observer } from "rxjs/Observer";
// import { Subject } from "rxjs/Subject";
// import { Constants } from "../_common/constant";
// import {
//   PublicMsgResponse,
//   PrivateMsgResponse,
//   SystemPublicMsgResponse,
//   PublicMsgRequest,
//   PrivateMsgRequest,
//   GamerInfo,
//   Room,
//   SystemResponse
// } from "../_model/socket.model";

// @Injectable()
// export class SocketService {
//   private socket = io(Constants.URL_CONNECT_SOCKET_SERVER);
//   private Observer: Observable<any>;

//   constructor() {}

//   getPublicMessage(): Observable<PublicMsgResponse> {
//     let observable = new Observable<PublicMsgResponse>(observer => {
//       this.socket.on(Constants.SERVER_PUBLIC_MESSAGE, res => {
//         observer.next(res);
//       });
//     });
//     return observable;
//   }

//   getPrivateMessage(): Observable<PrivateMsgResponse> {
//     let observable = new Observable<PrivateMsgResponse>(observer => {
//       this.socket.on(Constants.SERVER_PRIVATE_MESSAGE, res => {
//         observer.next(res);
//       });
//     });
//     return observable;
//   }

//   getSystemPublicMessage(): Observable<SystemPublicMsgResponse> {
//     let observable = new Observable<SystemPublicMsgResponse>(observer => {
//       this.socket.on(Constants.SERVER_SYSTEM_PUBLIC_MESSAGE, res => {
//         observer.next(res);
//       });
//     });
//     return observable;
//   }

//   getMsgCreateRoom(): Observable<SystemResponse<any>> {
//     let observable = new Observable<SystemResponse<any>>(observer => {
//       this.socket.on(Constants.SERVER_NOTIEC_CREATE_ROOM, res => {
//         observer.next(res);
//       });
//     });
//     return observable;
//   }

//   getAllRoom(): Observable<SystemResponse<Array<Room>>> {
//     let observable = new Observable<SystemResponse<Array<Room>>>(observer => {
//       this.socket.on(Constants.SERVER_GET_ALL_ROOM, res => {
//         observer.next(res);
//       });
//     });
//     return observable;
//   }

//   getDetailRoom(): Observable<SystemResponse<Room>> {
//     let observable = new Observable<SystemResponse<Room>>(observer => {
//       this.socket.on(Constants.SERVER_SEND_DETAIL_ROOM, res => {
//         observer.next(res);
//       });
//     });
//     return observable;
//   }

//   sendPublicMessage(publicMsg: PublicMsgRequest): void {
//     this.socket.emit(Constants.CLIENT_PUBLIC_MESSAGE, publicMsg);
//   }

//   sendPrivateMessage(privateMsg: PrivateMsgRequest): void {
//     this.socket.emit(Constants.CLIENT_PRIVATE_MESSAGE, privateMsg);
//   }

//   sendInformation(gamerInfo: GamerInfo): void {
//     this.socket.emit(Constants.CLIENT_INFORMATION, gamerInfo);
//   }

//   createRoom(newRoom: Room) {
//     this.socket.emit(Constants.CLIENT_CREATE_ROOM, newRoom);
//   }

//   // obj = {nameRoom : name_room, gamerInfo: gamerInfo}
//   joinRoom(obj: any) {
//     this.socket.emit(Constants.CLIENT_JOIN_ROOM, obj);
//   }

//   sendRoomName(nameRoom: string): void {
//     this.socket.emit(Constants.CLIENT_SEND_NAME_ROOM, nameRoom);
//   }
// }
