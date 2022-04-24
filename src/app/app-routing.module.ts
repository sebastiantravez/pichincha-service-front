import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './pages/account/account.component';
import { MovementsComponent } from './pages/movements/movements.component';
import { PersonComponent } from './pages/person/person.component';
import { ReportsComponent } from './pages/reports/reports.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: SidebarComponent,
        children: [
          { path: 'person', component: PersonComponent, pathMatch: 'full' },
          { path: 'account', component: AccountComponent, pathMatch: 'full' },
          {
            path: 'movements',
            component: MovementsComponent,
            pathMatch: 'full',
          },
          { path: 'reports', component: ReportsComponent, pathMatch: 'full' },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
