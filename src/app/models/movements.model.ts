import { AccountPresenter } from './account.model';

export class MovementPresenter {
  constructor(
    public movementId?: string,
    public movementDate?: Date,
    public movementType?: string,
    public observation?: string,
    public movementAmount?: number,
    public balanceAvailable?: number,
    public accountPresenter?: AccountPresenter,
    public transactionType?: string
  ) {}
}
