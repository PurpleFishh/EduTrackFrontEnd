import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { LessonDisplayDto } from 'src/app/core/models/lesson.model';
import { AuthenticationService } from 'src/app/core/services/authentication.service';

@Component({
  selector: 'app-lesson-display-card',
  templateUrl: './lesson-display-card.component.html',
  styleUrls: ['./lesson-display-card.component.scss']
})
export class LessonDisplayCardComponent {
  @Input() lesson!: LessonDisplayDto;
  @Input() index!: number;
  @Input() isEnrolled!: boolean;

  @Output() startLesson: EventEmitter<any> = new EventEmitter();

  panelOpenState = false;

  constructor(private readonly router: Router, private readonly auth: AuthenticationService) { }

  
}
