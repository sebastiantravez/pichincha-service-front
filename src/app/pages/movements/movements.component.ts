import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountType } from 'src/app/enums/account.type';
import { AccountPresenter } from 'src/app/models/account.model';
import { MovementPresenter } from 'src/app/models/movements.model';
import { PersonPresenter } from 'src/app/models/person.model';
import { AccountService } from 'src/app/services/account.service';
import { MovementsService } from 'src/app/services/movements.service';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-movements',
  templateUrl: './movements.component.html',
  styleUrls: ['./movements.component.css'],
})
export class MovementsComponent implements OnInit {
  movementForm: FormGroup;
  isNewMovement: boolean = false;
  update: boolean = false;
  movements: MovementPresenter[] = [];
  accounts: AccountPresenter[] = [];
  persons: PersonPresenter[] = [];

  constructor(
    public formBuilder: FormBuilder,
    private personService: PersonService,
    private accountService: AccountService,
    private movementService: MovementsService
  ) {
    this.movementForm = this.formBuilder.group({
      movementId: [''],
      movementType: ['', Validators.compose([Validators.required])],
      movementAmount: ['', Validators.compose([Validators.required])],
      observation: ['', Validators.compose([Validators.required])],
      accountId: ['', Validators.compose([Validators.required])],
      clientId: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.getAllMovements();
    this.getAllPersons();
  }

  getAllMovements() {
    this.movementService
      .getAllMovements()
      .subscribe((data: MovementPresenter[]) => {
        this.movements = data;
      });
  }

  getAllAccounts() {
    this.accountService
      .getAllAccounts()
      .subscribe((data: AccountPresenter[]) => {
        this.accounts = data;
      });
  }

  getAllPersons() {
    this.personService.getAllPersons().subscribe((data: PersonPresenter[]) => {
      this.persons = data;
    });
  }

  saveMovement() {
    debugger;
    if (this.movementForm.valid) {
      const account = new AccountPresenter(
        this.movementForm.value.accountId,
        '',
        AccountType.AHORROS,
        0,
        false,
        new PersonPresenter()
      );
      const movement = new MovementPresenter(
        '',
        new Date(),
        this.movementForm.value.movementType.toString(),
        this.movementForm.value.observation,
        this.movementForm.value.movementAmount,
        0,
        account,
        'APROBADA'
      );
      this.movementService.saveMovement(movement).subscribe(
        (data) => {
          this.getAllPersons();
          this.getAllMovements();
          this.movementForm.reset();
          this.isNewMovement = false;
          alert('Movimiento registrado con exito');
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
    this.isNewMovement = false;
    this.getAllMovements();
  }

  searchMovement(event: string) {
    if (event.length > 3) {
      this.movementService
        .searchMovement(event)
        .subscribe((data: MovementPresenter[]) => {
          this.movements = data;
        });
    }
    if (event.length <= 0) {
      this.getAllMovements();
    }
  }

  registerMovement() {
    this.isNewMovement = true;
    this.update = false;
    this.movementForm.reset();
  }

  deleteMovement(movement: MovementPresenter) {
    const movementId: any = movement.movementId;
    this.movementService.deleteMovement(movementId).subscribe((data) => {
      this.getAllMovements();
      alert('Transaccion eliminada');
    });
  }

  getAllAccountsByClient(person: any) {
    this.accountService
      .getAllAccountsByClient(person.target.value)
      .subscribe((data) => {
        this.accounts = data;
      });
  }
}
