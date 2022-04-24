import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { AccountService } from './services/account.service';
import { MovementsService } from './services/movements.service';
import { PersonService } from './services/person.service';
import { PersonComponent } from './pages/person/person.component';
import { AccountComponent } from './pages/account/account.component';
import { MovementsComponent } from './pages/movements/movements.component';

@NgModule({
  declarations: [AppComponent, PersonComponent, AccountComponent, MovementsComponent],
  imports: [AppRoutingModule, BrowserModule],
  providers: [PersonService, AccountService, MovementsService],
  bootstrap: [AppComponent],
})
export class AppModule {}
