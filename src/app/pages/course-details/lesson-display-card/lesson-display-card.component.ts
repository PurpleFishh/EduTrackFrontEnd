import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LessonDisplayDto } from 'src/app/core/models/lesson.model';

@Component({
  selector: 'app-lesson-display-card',
  templateUrl: './lesson-display-card.component.html',
  styleUrls: ['./lesson-display-card.component.scss']
})
export class LessonDisplayCardComponent {
  @Input() lesson!: LessonDisplayDto;
  @Input() index!: number;

  panelOpenState = false;

  constructor(private readonly router: Router) { }

  startLesson()
  {
    this.router.navigateByUrl(`${this.router.url}/lesson/${this.lesson.name}`);
    window.scrollTo(0, 0);
  }
}
