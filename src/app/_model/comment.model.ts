import { Status } from "./enum.model";

export class CommentResponse {
  _id: string;

  content: string;

  status: Status;

  post: string;

  user: {
    _id: string;

    fullname: string;

    email: string;

    avatar_url: string;
  };

  total_replies: Number;

  replies: [
    {
      _id: string;

      content: string;

      user: {
        _id: string;

        fullname: string;

        email: string;

        avatar_url: string;
      };

      status: Status;

      post: string;

      image_url: Array<string>;

      users_like: Array<string>;

      create_at: Date;

      update_at: Date;
    }
  ];

  users_like: Array<string>;

  image_url: Array<string>;

  create_at: Date;

  update_at: Date;
}
