import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MaterialModule} from '../material.module'
import { ContactUsRoutes } from './contactus.routring';
import { ContactUsComponent } from './contact-us.component';

@NgModule({
  imports: [
    RouterModule.forChild(ContactUsRoutes),
    CommonModule,
    FormsModule,
    MaterialModule,

  ],
  declarations: [
    ContactUsComponent

  ]
})

export class ContactUsModule {}
