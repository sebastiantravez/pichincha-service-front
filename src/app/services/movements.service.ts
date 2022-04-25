import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ambiente } from 'src/environments/environment';
import { MovementPresenter } from '../models/movements.model';

@Injectable({
  providedIn: 'root',
})
export class MovementsService {
  constructor(public http: HttpClient) {}

  saveMovement(movementsPresenter: MovementPresenter) {
    return this.http.post(
      ambiente.urlServicioRest + 'saveMovement',
      movementsPresenter
    );
  }

  updateMovement(movementsPresenter: MovementPresenter) {
    return this.http.put(
      ambiente.urlServicioRest + 'updateMovement',
      movementsPresenter
    );
  }

  getAllMovements() {
    return this.http.get<MovementPresenter[]>(
      ambiente.urlServicioRest + 'getAllMovements'
    );
  }

  deleteMovement(movementId: string) {
    return this.http.delete(
      ambiente.urlServicioRest + 'deleteMovement?movementId=' + movementId
    );
  }

  searchMovement(value: string) {
    return this.http.get<MovementPresenter[]>(
      ambiente.urlServicioRest + 'searchMovement/' + value
    );
  }
}
