import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: '', component: HomeComponent ,
     children: [
      {
        path: '',
         loadChildren: () => import('./employee/employee.module').then(m => m.EmployeeModule)
      },
      {
        path: '',
         loadChildren: () => import('./contact-us/ContactUs.module').then(m => m.ContactUsModule)
      },


      ]},

  // {
  //   path: '',
  //    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  // },



];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
