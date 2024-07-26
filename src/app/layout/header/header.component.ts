import { Component } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import { CoursesService } from 'src/app/core/services/courses.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  currentRoute: string = '';

  constructor(private readonly router: Router, private readonly coursesService: CoursesService) {}

  ngOnInit() {
    this.currentRoute = "/"+ this.router.url.split('?')[0].split('/')[1];
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd)
        this.currentRoute = "/"+ event.urlAfterRedirects.split('?')[0].split('/')[1];
    });
  }

  navigate(path: string) {
    this.router.navigateByUrl(path);
  }

  isCurrentPage(route: string): boolean {
    return this.currentRoute === route;
  }

  onSearchSubmit(form: NgForm) {
    if(form.value.search != '') {
      this.router.navigateByUrl(`/courses?search=${form.value.search}`);
    }else{
      this.router.navigateByUrl(`/courses`);
    }
  }
}
