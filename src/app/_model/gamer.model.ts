export class GamerResponse {
  _id: string;

  email: string;

  fullname: string;

  avatar_url: string;

  character: string;

  is_die: boolean;

  is_view: boolean;

  constructor(_id, is_view) {
    this._id = _id;
    this.is_view = is_view;
  }
}

export class GamerRequest{
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
