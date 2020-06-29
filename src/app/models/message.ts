export class Message {
  constructor(
    // tslint:disable-next-line:variable-name
    public _id: string,
    public text: string,
    public viewed: string,
    // tslint:disable-next-line:variable-name
    public created_at: string,
    public emitter: string,
    public receiver: string
  ) {
  }
}
