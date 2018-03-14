import { GamerResponse, GamerRequest } from "./gamer.model";
import { MsgStatus, Action } from "./enum.model";

export class PublicMsg {
  sender: GamerResponse;

  content: any;

  create_at: Date;
}

export class PrivateMsg {
  arrReceive: Array<GamerResponse>;

  content: any;

  sender: GamerResponse;

  create_at: Date;
}

export class SystemPublicMsgResponse {
  content: any;

  create_at: Date;
}

export class SystemResponse<T> {
  result: number;

  message: string;

  value: T;

  create_at: Date;
}

export class GamerInfo {
  _id: string;

  socket_id: string;

  email: string;

  fullname: string;

  avatar_url: string;

  is_owner: boolean;

  game: string;

  name_room: string;

  is_die: boolean;

  is_view: boolean;

  character: string;

  constructor() {}
}

export class Room {
  owner: GamerRequest;

  name_room: string;

  password: string;

  create_at: Date;

  is_started: boolean;

  round: number;

  arrGamer: Array<GamerInfo>;
}

export class CoundDown {
  name: string;

  ttl: number; //second

  isInRound: boolean;

  isInFirstVote: boolean;

  isInSecondVote: boolean;
}


export class GamerAction{
  character : GamerInfo;

  action : Action;

  victim : GamerInfo
}