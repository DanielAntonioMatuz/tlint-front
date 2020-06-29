export class Publication {
  constructor(
    // tslint:disable-next-line:variable-name
    public _id: string,
    public text: string,
    public file: string,
    // tslint:disable-next-line:variable-name
    public created_at: string,
    public user: string

  ) {
  }
}
