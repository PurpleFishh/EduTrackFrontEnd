import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared/shared.module';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { MainLayoutComponent } from './main-layout/main-layout.component';
import { NavbarActionComponent } from './header/navbar-action/navbar-action.component';
import { Router } from '@angular/router';


@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainLayoutComponent,
    NavbarActionComponent,
  ],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    MainLayoutComponent
  ]
})
export class LayoutModule { 
}
