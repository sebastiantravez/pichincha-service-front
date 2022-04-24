import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonComponent } from './pages/person/person.component';
import { SidebarComponent } from './pages/sidebar/sidebar.component';

@NgModule({
  imports: [
    RouterModule.forRoot([
      {
        path: '',
        component: SidebarComponent,
        children: [
          { path: 'person', component: PersonComponent, pathMatch: 'full' },
        ],
      },
    ]),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
