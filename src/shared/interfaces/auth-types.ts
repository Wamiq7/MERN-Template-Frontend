export interface IAuthCredentials {
  email: string;
  password: string;
}

export interface IOtp {
  email: string;
  otp: string;
}

export interface IResetPwd {
  token: string;
  newPassword: string;
}

export interface IChangePwd {
  oldPassword: string;
  newPassword: string;
}

export interface IOAuth {
  data: {
    role: string;
  };
  token: string;
}
