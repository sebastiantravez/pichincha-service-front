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
  update: boolean = false;
  persons: PersonPresenter[] = [];

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

  ngOnInit(): void {
    this.getAllPersons();
  }

  registerPerson() {
    this.isNewPerson = true;
    this.update = false;
    this.personForm.reset();
  }

  canceled() {
    this.isNewPerson = false;
  }

  savePerson() {
    if (this.personForm.valid) {
      const client = new ClientPresenter(
        '',
        this.personForm.value.password.toString(),
        this.personForm.value.status.toString()
      );
      const person = new PersonPresenter(
        '',
        this.personForm.value.fullName.toString(),
        this.personForm.value.genderPerson.toString(),
        this.personForm.value.age,
        this.personForm.value.dni.toString(),
        this.personForm.value.identificationPattern.toString(),
        this.personForm.value.address.toString(),
        this.personForm.value.phone.toString(),
        client
      );
      this.personService.savePerson(person).subscribe(
        (data) => {
          this.getAllPersons();
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

  getAllPersons() {
    this.personService.getAllPersons().subscribe((data: PersonPresenter[]) => {
      this.persons = data;
    });
  }

  editPerson(person: PersonPresenter) {
    this.personForm.get('fullName')?.setValue(person.fullName);
    this.personForm.get('genderPerson')?.setValue(person.genderPerson);
    this.personForm.get('age')?.setValue(person.age);
    this.personForm.get('dni')?.setValue(person.dni);
    this.personForm
      .get('identificationPattern')
      ?.setValue(person.identificationPattern);
    this.personForm.get('address')?.setValue(person.address);
    this.personForm.get('phone')?.setValue(person.phone);
    this.personForm.get('password')?.setValue(person.clientPresenter?.password);
    this.personForm.get('status')?.setValue(person.clientPresenter?.status);
    this.isNewPerson = true;
    this.update = true;
  }

  updatePerson() {
    if (this.personForm.valid) {
      const client = new ClientPresenter(
        '',
        this.personForm.value.password.toString(),
        this.personForm.value.status.toString()
      );
      const person = new PersonPresenter(
        '',
        this.personForm.value.fullName.toString(),
        this.personForm.value.genderPerson.toString(),
        this.personForm.value.age,
        this.personForm.value.dni.toString(),
        this.personForm.value.identificationPattern.toString(),
        this.personForm.value.address.toString(),
        this.personForm.value.phone.toString(),
        client
      );
      this.personService.updatePerson(person).subscribe(
        (data) => {
          alert('Registro de cliente actualizado con exito');
          this.getAllPersons();
          this.personForm.reset();
          this.isNewPerson = false;
        },
        (error: HttpErrorResponse) => {
          alert(error.error.message);
        }
      );
    } else {
      alert('Todos los campos son requeridos');
    }
  }

  deletePerson(person: PersonPresenter) {
    const personId: any = person.personId;
    this.personService.deletePerson(personId).subscribe((data) => {
      this.getAllPersons();
      alert('Cliente eliminado');
    });
  }

  searchPerson(event: string) {
    if (event.length > 3) {
      this.personService
        .searchPerson(event)
        .subscribe((data: PersonPresenter[]) => {
          this.persons = data;
        });
    }
    if (event.length <= 0) {
      this.getAllPersons();
    }
  }
}
