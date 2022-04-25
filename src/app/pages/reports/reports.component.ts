import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountPresenter } from 'src/app/models/account.model';
import { PersonPresenter } from 'src/app/models/person.model';
import { PersonService } from 'src/app/services/person.service';
import { ReportService } from 'src/app/services/report.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.css'],
})
export class ReportsComponent implements OnInit {
  persons: PersonPresenter[] = [];
  reportForm: FormGroup;
  constructor(
    private reportService: ReportService,
    private personService: PersonService,
    private formBuilder: FormBuilder
  ) {
    this.reportForm = this.formBuilder.group({
      clientId: ['', Validators.compose([Validators.required])],
      accountType: ['', Validators.compose([Validators.required])],
      initDate: ['', Validators.compose([Validators.required])],
      endDate: ['', Validators.compose([Validators.required])],
    });
  }

  ngOnInit(): void {
    this.getAllPersons();
  }

  getAllPersons() {
    this.personService.getAllPersons().subscribe((data: PersonPresenter[]) => {
      this.persons = data;
    });
  }

  generateReport() {
    debugger
    if (this.reportForm.valid) {
      this.reportService
        .generateReport(
          this.reportForm.value.clientId,
          this.reportForm.value.accountType,
          this.reportForm.value.initDate,
          this.reportForm.value.endDate
        )
        .subscribe(
          (data: AccountPresenter) => {
            this.showPdf(data.pdf);
          },
          (error: HttpErrorResponse) => {
            alert(error.error.message);
          }
        );
    }
  }

  showPdf(pdf: any) {
    const pdfAsDataUri = 'data:application/pdf;base64,' + pdf;
    const array = this.convertDataURIToBinary(pdfAsDataUri);
    const pdfByte = new Blob([array], { type: 'application/pdf' });
    const fileURL = URL.createObjectURL(pdfByte);
    const a: HTMLAnchorElement = document.createElement('a');
    a.href = fileURL;
    a.target = '_blank';
    document.body.appendChild(a);
    a.click();
  }

  convertDataURIToBinary(dataURI: any) {
    const BASE64_MARKER = ';base64,';
    const base64Index = dataURI.indexOf(BASE64_MARKER) + BASE64_MARKER.length;
    const base64 = dataURI.substring(base64Index);
    const raw = window.atob(base64);
    const rawLength = raw.length;
    const array = new Uint8Array(new ArrayBuffer(rawLength));
    for (let i = 0; i < rawLength; i++) {
      array[i] = raw.charCodeAt(i);
    }
    return array;
  }
}
