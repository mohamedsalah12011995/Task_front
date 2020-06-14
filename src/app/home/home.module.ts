import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routring';
import { MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import { MaterialModule} from '../material.module'

@NgModule({
  imports: [
    RouterModule.forChild(HomeRoutes),
    CommonModule,
    FormsModule,
    MaterialModule,

  ],
  declarations: [
    HomeComponent

  ]
})

export class HomeModule {}
