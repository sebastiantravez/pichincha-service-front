export class PersonPresenter {
  constructor(
    public personId?: string,
    public fullName?: string,
    public genderPerson?: string,
    public age?: number,
    public dni?: string,
    public identificationPattern?: string,
    public address?: string,
    public phone?: string,
    public clientPresenter?: ClientPresenter
  ) {}
}

export class ClientPresenter {
  constructor(
    public clientId?: string,
    public password?: string,
    public status?: boolean
  ) {}
}
