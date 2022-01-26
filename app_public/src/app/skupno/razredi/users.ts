export class details {
  constructor(public location: string | null, public about: string | null) {
  }
}

export class Users {
  constructor(
    public uporabniskoIme: string,
    public geslo: string,
    public email: string,
    public ime: string,
    public priimek: string,
    public details: details | null) {}
}
