import { PersonPresenter } from './person.model';

export class AccountPresenter {
  constructor(
    public accountId?: string,
    public accountNumber?: string,
    public accountType?: string,
    public initialAmount?: number,
    public status?: boolean,
    public personPresenter?: PersonPresenter,
    public pdf?: any
  ) {}
}
