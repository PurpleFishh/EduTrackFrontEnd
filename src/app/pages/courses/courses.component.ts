import { Component } from '@angular/core';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {
  courses = [
    {
      title: 'Angular',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription: 'A powerful framework for building single-page applications.',
      image: '' +'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'
    },
    {
      title: 'React',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription: 'A JavaScript library for building user interfaces.',
      image: 'https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg'
    },
    {
      title: 'Vue',
      prerequisites: 'HTML, CSS, JavaScript',
      difficulty: 'Intermediate',
      shortDescription: 'A progressive framework for building user interfaces.',
      image: 'https://vuejs.org/images/logo'
    }
  ];
}
