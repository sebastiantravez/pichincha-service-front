import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientPresenter, PersonPresenter } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent implements OnInit {
  personForm: FormGroup;
  isNewPerson: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private personService: PersonService
  ) {
    this.personForm = this.formBuilder.group({
      fullName: ['', Validators.compose([Validators.required])],
      genderPerson: ['', Validators.compose([Validators.required])],
      age: ['', Validators.compose([Validators.required])],
      dni: ['', Validators.compose([Validators.required])],
      identificationPattern: ['', Validators.compose([Validators.required])],
      address: ['', Validators.compose([Validators.required])],
      phone: ['', Validators.compose([Validators.required])],
      password: ['', Validators.compose([Validators.required])],
      status: [true],
    });
  }

  ngOnInit(): void {}

  get fullName() {
    return this.personForm.get('fullName');
  }
  get dni() {
    return this.personForm.get('dni');
  }
  get age() {
    return this.personForm.get('age');
  }
  get identificationPattern() {
    return this.personForm.get('identificationPattern');
  }
  get address() {
    return this.personForm.get('address');
  }
  get phone() {
    return this.personForm.get('phone');
  }
  get password() {
    return this.personForm.get('password');
  }
  get status() {
    return this.personForm.get('status');
  }

  registerPerson() {
    this.isNewPerson = true;
  }

  canceled() {
    this.isNewPerson = false;
  }

  savePerson() {
    if (this.personForm.valid) {
      const client = new ClientPresenter(
        '',
        this.personForm.value.password,
        this.personForm.value.status
      );
      const person = new PersonPresenter(
        '',
        this.personForm.value.fullName,
        this.personForm.value.genderPerson,
        this.personForm.value.age,
        this.personForm.value.dni,
        this.personForm.value.identificationPattern,
        this.personForm.value.address,
        this.personForm.value.phone,
        client
      );
      this.personService.saveEmployee(person).subscribe(
        (data) => {
          this.personForm.reset();
          this.isNewPerson = false;
          alert('Cliente registrado con exito');
        },
        (error: HttpErrorResponse) => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Todos los campos son requeridos');
    }
  }
}
