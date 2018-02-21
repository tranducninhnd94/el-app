export class User {
  _id: string;

  fullname: string;

  gender: string;

  email: string;

  position: string;

  avatar_url: string;

  description: string;

  // role

  location: string;

  graduation: string;

  department: string;

  job: string;

  skill: string;

  phone_number: string;

  birthday: string;

  create_at: Date;

  update_at: Date;
}

export class UserResponse {
  _id: string;

  fullname: string;

  gender: string;

  email: string;

  position: string;

  avatar_url: string;

  description: string;

  // role

  location: string;

  graduation: string;

  department: string;

  job: string;

  skill: string;

  phone_number: string;

  birthday: string;

  create_at: Date;

  update_at: Date;
}

export class UserRequest { }

export class LoginInfo {
  
  token: string;

  infor: {

  }
}
