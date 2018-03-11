import { GamerResponse, GamerRequest } from "./gamer.model";
import { MsgStatus } from "./enum.model";

export class PublicMsgResponse {

    sender: GamerResponse;

    content: any;

    create_at: Date
}

export class PrivateMsgResponse {
    arrReceive: Array<GamerResponse>;

    content: any;

    sender: GamerResponse;

    create_at: Date
}

export class SystemPublicMsgResponse {
    content: any;

    create_at: Date
}

export class PublicMsgRequest {

    sender: GamerResponse;

    content: any;

    create_at: Date
}

export class PrivateMsgRequest {
    arrReceive: Array<GamerResponse>;

    content: any;

    sender: GamerResponse;

    create_at: Date
}

export class GamerInfo {
    gamer: GamerRequest
}

export class NewRoom {
    owner: GamerRequest;

    room: Room
}

export class Room {

    name_room: string;

    password: string;

    create_at: Date

}