export interface ICreateUser {
  mail: string;
  password: string;
  updatedAt: Date;
}

export interface IUpdateUser {
  mail: string;
  password: string;
  updatedAt: Date;
}

export interface ILogin {
  mail: string;
  password: string;
}
