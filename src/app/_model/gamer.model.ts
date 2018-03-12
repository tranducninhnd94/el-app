export class GamerResponse {
  _id: string;

  email: string;

  fullname: string;

  avatar_url: string;

  socket_id: string;
 

  constructor() {
  }
}

export class GamerRequest {
  _id: string;

  email: string;

  fullname: string;

  avatar_url: string;
}

export class VoteInfo {
  chooser: GamerResponse;
  listVoter: Array<GamerResponse>;
  total_vote: number;
}
