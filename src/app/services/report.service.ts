import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ambiente } from 'src/environments/environment';
import { AccountType } from '../enums/account.type';
import { AccountPresenter } from '../models/account.model';

@Injectable({
  providedIn: 'root',
})
export class ReportService {
  constructor(private http: HttpClient) {}

  generateReport(
    clientId: string,
    accountType: string,
    initDate: any,
    endDate: any
  ) {
    return this.http.get<AccountPresenter>(
      ambiente.urlServicioRest +
        'getAccountStatusReport?clientId=' +
        clientId +
        '&accountType=' +
        accountType +
        '&initDate=' +
        initDate +
        '&endDate=' +
        endDate
    );
  }
}
