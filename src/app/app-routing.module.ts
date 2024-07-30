import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { LoginComponent } from './pages/login/login.component';
import { UnauthorizedComponent } from './pages/unauthorized/unauthorized.component';
import { CoursesComponent } from './pages/courses/courses.component';
import { MainPageComponent } from './pages/main-page/main-page.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';

const routes: Routes = [
   {
     path: '',
     component: MainLayoutComponent,
      children: [
        {
          path: 'login',
          component: LoginComponent,
        },
        {
          path: 'courses',
          component: CoursesComponent,
        },
        {
          path:'about',
          component: AboutUsComponent
        },
        {
          path: 'main',
          component: MainPageComponent
        },
        
        {
          path: 'unauthorized',
          component: UnauthorizedComponent,
        },
        
      ]
   }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
