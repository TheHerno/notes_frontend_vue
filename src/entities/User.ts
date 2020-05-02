export default class User {
  id?: string | number;
  //username: string;
  password: string;
  email: string;
  constructor(email: string, password: string) {
    this.password = password;
    this.email = email;
  }
}
