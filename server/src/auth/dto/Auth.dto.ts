interface AuthValidateRequestProps {
  username: string;
  email: string;
  userId: number;
}

export class AuthValidateResponse {
  userId: number;

  username: string;

  email: string;

  constructor({ email, userId, username }: AuthValidateRequestProps) {
    this.username = username;
    this.email = email;
    this.userId = userId;
  }
}
