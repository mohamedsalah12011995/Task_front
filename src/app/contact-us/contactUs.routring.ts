
import { Routes } from '@angular/router';
import { ContactUsComponent } from './contact-us.component';

export const ContactUsRoutes: Routes = [

  {
    path: '',
    children: [ {
      path: 'contact',
      component: ContactUsComponent
  }]
}
];

