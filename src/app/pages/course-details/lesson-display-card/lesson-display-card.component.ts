import { Component, Input } from '@angular/core';
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
}
