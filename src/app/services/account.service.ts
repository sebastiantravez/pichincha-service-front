import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ambiente } from 'src/environments/environment';
import { AccountPresenter } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(public http: HttpClient) {}

  saveAccount(accountPresenter: AccountPresenter) {
    return this.http.post(
      ambiente.urlServicioRest + 'saveAccount',
      accountPresenter
    );
  }

  updateAccount(accountPresenter: AccountPresenter) {
    return this.http.put(
      ambiente.urlServicioRest + 'updateAccount',
      accountPresenter
    );
  }

  getAllAccounts() {
    return this.http.get<AccountPresenter[]>(
      ambiente.urlServicioRest + 'getAllAccounts'
    );
  }

  deleteAccount(accountId: string) {
    return this.http.delete(
      ambiente.urlServicioRest + 'deleteAccount?accountId=' + accountId
    );
  }

  searchAccount(value: string) {
    return this.http.get<AccountPresenter[]>(
      ambiente.urlServicioRest + 'searchAccount/' + value
    );
  }
}
