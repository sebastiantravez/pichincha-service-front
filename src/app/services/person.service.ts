import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ambiente } from 'src/environments/environment';
import { PersonPresenter } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(public http: HttpClient) {}

  saveEmployee(personPresenter: PersonPresenter) {
    return this.http.post(
      ambiente.urlServicioRest + 'savePerson',
      personPresenter
    );
  }
}
