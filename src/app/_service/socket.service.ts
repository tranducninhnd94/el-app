import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { Subject } from 'rxjs/Subject';
import { Constants } from '../_common/constant';
import { PublicMsgResponse, PrivateMsgResponse, SystemPublicMsgResponse, PublicMsgRequest, PrivateMsgRequest, GamerInfo, NewRoom, Room } from '../_model/socket.model';

@Injectable()
export class SocketService {
    private socket = io(Constants.URL_CONNECT_SOCKET_SERVER);
    private Observer: Observable<any>;

    constructor() {

    }

    getPublicMessage(): Observable<PublicMsgResponse> {
        let observable = new Observable<PublicMsgResponse>(observer => {
            this.socket.on(Constants.SERVER_PUBLIC_MESSAGE, (res) => {
                observer.next(res);
            })
        })
        return observable;
    }


    getPrivateMessage(): Observable<PrivateMsgResponse> {
        let observable = new Observable<PrivateMsgResponse>(observer => {
            this.socket.on(Constants.SERVER_PRIVATE_MESSAGE, (res) => {
                observer.next(res);
            })
        })
        return observable;
    }

    getSystemMessage(): Observable<SystemPublicMsgResponse> {
        let observable = new Observable<SystemPublicMsgResponse>(observer => {
            this.socket.on(Constants.SERVER_SYSTEM_PUBLIC_MESSAGE, (res) => {
                observer.next(res);
            })
        })
        return observable;
    }

    sendPublicMessage(publicMsg: PublicMsgRequest): void {
        this.socket.emit(Constants.CLIENT_PUBLIC_MESSAGE, publicMsg);
    }

    sendPrivateMessage(privateMsg: PrivateMsgRequest): void {
        this.socket.emit(Constants.CLIENT_PRIVATE_MESSAGE, privateMsg);
    }

    sendInformation(gamerInfo: GamerInfo): void{
        this.socket.emit(Constants.CLIENT_INFORMATION, gamerInfo);
    }

    createRoom(newRoom: NewRoom){
        this.socket.emit(Constants.CLIENT_CREATE_ROOM, newRoom);
    }

    joinRoom(room: Room){
        this.socket.emit(Constants.CLIENT_JOIN_ROOM, room);
    }
}
