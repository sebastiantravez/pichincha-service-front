import { Component, OnInit } from '@angular/core';
import { PersonPresenter } from 'src/app/models/person.model';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  persons: PersonPresenter[] = [];
  constructor() {}

  ngOnInit(): void {}
}
