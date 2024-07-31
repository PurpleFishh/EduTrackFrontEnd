import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-lesson-action-area',
  templateUrl: './lesson-action-area.component.html',
  styleUrls: ['./lesson-action-area.component.scss']
})
export class LessonActionAreaComponent {
  @Input() currentGrade: string | undefined;
  @Input({required: true}) finalGrade!: number;

}
