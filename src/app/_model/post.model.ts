import { Status } from "./enum.model";

export class PostRequest {
  title: string;

  content: String;
}

export class PostResponse {
  _id: string;

  title: string;

  content: string;

  type: Status;

  user: {
    _id: string;

    fullname: string;

    email: string;

    avatar_url: string;
  };

  upload_file: [
    {
      _id: string;

      path: string;

      mimetype: string;

      size: Number;

      originalname: string;

      encoding: string;

      filename: string;

      create_at: Date;
    }
  ];

  create_at: Date;

  update_at: Date;
}
