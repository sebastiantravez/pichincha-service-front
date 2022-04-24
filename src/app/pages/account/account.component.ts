import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenderPerson } from 'src/app/enums/gender.person';
import { IndentificationPattern } from 'src/app/enums/identification.pattern';
import { AccountPresenter } from 'src/app/models/account.model';
import { ClientPresenter, PersonPresenter } from 'src/app/models/person.model';
import { AccountService } from 'src/app/services/account.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css'],
})
export class AccountComponent implements OnInit {
  accountForm: FormGroup;
  isNewAccount: boolean = false;
  update: boolean = false;
  accounts: AccountPresenter[] = [];
  persons: PersonPresenter[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private personService: PersonService,
    private accountService: AccountService
  ) {
    this.accountForm = this.formBuilder.group({
      accountId: [''],
      accountNumber: ['', Validators.compose([Validators.required])],
      accountType: ['', Validators.compose([Validators.required])],
      initialAmount: ['', Validators.compose([Validators.required])],
      status: [true],
      clientId: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.getAllPersons();
    this.getAllAccounts();
  }

  getAllAccounts() {
    this.accountService
      .getAllAccounts()
      .subscribe((data: AccountPresenter[]) => {
        this.accounts = data;
      });
  }

  saveAccount() {
    if (this.accountForm.valid) {
      const client = new ClientPresenter(
        this.accountForm.value.clientId,
        '',
        true
      );
      const person = new PersonPresenter(
        '',
        '',
        GenderPerson.OTRO,
        0,
        '',
        IndentificationPattern.CEDULA,
        '',
        '',
        client
      );
      const account = new AccountPresenter(
        '',
        this.accountForm.value.accountNumber.toString(),
        this.accountForm.value.accountType.toString(),
        this.accountForm.value.initialAmount,
        true,
        person
      );
      this.accountService.saveAccount(account).subscribe(
        (data) => {
          this.getAllPersons();
          this.getAllAccounts();
          this.accountForm.reset();
          this.isNewAccount = false;
          alert('Cuenta de cliente registrada con exito');
        },
        (error: HttpErrorResponse) => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Todos los campos son requeridos');
    }
  }

  canceled() {
    this.isNewAccount = false;
  }

  searchAccount(event: string) {
    if (event.length > 3) {
      this.accountService
        .searchAccount(event)
        .subscribe((data: AccountPresenter[]) => {
          this.accounts = data;
        });
    }
    if (event.length <= 0) {
      this.getAllAccounts();
    }
  }

  registerAccount() {
    this.isNewAccount = true;
    this.update = false;
    this.accountForm.reset();
  }

  editAccount(account: AccountPresenter) {
    this.accountForm.get('accountId')?.setValue(account.accountId);
    this.accountForm.get('accountNumber')?.setValue(account.accountNumber);
    this.accountForm.get('accountType')?.setValue(account.accountType);
    this.accountForm.get('initialAmount')?.setValue(account.initialAmount);
    this.accountForm.get('status')?.setValue(account.status);
    this.accountForm
      .get('clientId')
      ?.setValue(account.personPresenter?.clientPresenter?.clientId);
    this.isNewAccount = true;
    this.update = true;
  }

  updateAccount() {
    if (this.accountForm.valid) {
      const client = new ClientPresenter(
        this.accountForm.value.clientId,
        '',
        true
      );
      const person = new PersonPresenter(
        '',
        '',
        GenderPerson.OTRO,
        0,
        '',
        IndentificationPattern.CEDULA,
        '',
        '',
        client
      );
      const account = new AccountPresenter(
        this.accountForm.value.accountId.toString(),
        this.accountForm.value.accountNumber.toString(),
        this.accountForm.value.accountType.toString(),
        this.accountForm.value.initialAmount,
        this.accountForm.value.status,
        person
      );
      this.accountService.updateAccount(account).subscribe(
        (data) => {
          this.getAllPersons();
          this.getAllAccounts();
          this.accountForm.reset();
          this.isNewAccount = false;
          alert('Cuenta de cliente actualizada con exito');
        },
        (error: HttpErrorResponse) => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Todos los campos son requeridos');
    }
  }

  deleteAccount(account: AccountPresenter) {
    const personId: any = account.accountId;
    this.accountService.deleteAccount(personId).subscribe((data) => {
      this.getAllAccounts();
      alert('Cuenta de cliente eliminada');
    });
  }

  getAllPersons() {
    this.personService.getAllPersons().subscribe((data: PersonPresenter[]) => {
      this.persons = data;
    });
  }
}
