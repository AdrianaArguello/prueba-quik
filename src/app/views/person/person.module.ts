import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonRoutingModule } from './person-routing.module';
import { PagesComponent } from './pages/pages.component';
import { PersonFormComponent } from './components/person-form/person-form.component';
import { PersonListComponent } from './components/person-list/person-list.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    PagesComponent,
    PersonListComponent,
    PersonFormComponent
  ],
  imports: [
    CommonModule,
    PersonRoutingModule,
    SharedModule,
  ]
})
export class PersonModule { }
