export class User {
  id?: string;
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  token?: string;
}

export class Authenticate {
  username: string;
  password: string;
}
