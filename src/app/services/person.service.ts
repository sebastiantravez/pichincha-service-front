import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ambiente } from 'src/environments/environment';
import { PersonPresenter } from '../models/person.model';

@Injectable({
  providedIn: 'root',
})
export class PersonService {
  constructor(public http: HttpClient) {}

  savePerson(personPresenter: PersonPresenter) {
    return this.http.post(
      ambiente.urlServicioRest + 'savePerson',
      personPresenter
    );
  }

  updatePerson(personPresenter: PersonPresenter) {
    return this.http.put(
      ambiente.urlServicioRest + 'updatePerson',
      personPresenter
    );
  }

  getAllPersons() {
    return this.http.get<PersonPresenter[]>(
      ambiente.urlServicioRest + 'getAllPersons'
    );
  }

  deletePerson(personId: string) {
    return this.http.delete(
      ambiente.urlServicioRest + 'deletePerson?personId=' + personId
    );
  }
}
