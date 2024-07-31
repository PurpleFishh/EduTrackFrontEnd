import { Component, OnInit } from '@angular/core';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-lesson',
  templateUrl: './update-lesson.component.html',
  styleUrls: ['./update-lesson.component.scss']
})
export class UpdateLessonComponent implements OnInit {
  courseTitle: string;
  lessonTitle: string;
  lessonDescription: string;
  lessonContent: string;

  constructor(
    private lessonsService: LessonsService,
    private router: Router
  ) {
    this.courseTitle = localStorage.getItem('courseTitle') || 'Franceza';
    this.lessonTitle = localStorage.getItem('lessonTitle') || 'lectie5';
    this.lessonDescription = '';
    this.lessonContent = '';
  }

  ngOnInit() {
    this.loadLesson();
  }

  loadLesson() {
    this.lessonsService.getLesson(this.courseTitle, this.lessonTitle).subscribe({
      next: (lesson) => {
        if (lesson) {
          this.lessonTitle = lesson.name;
          this.lessonDescription = lesson.description;
          this.lessonContent = lesson.lesson_Content;
        }
      },
      error: (error) => {
        console.error('Error loading lesson:', error);
      }
    });
  }

  onSubmit() {
    const lessonData = {
      name: this.lessonTitle,
      description: this.lessonDescription,
      lesson_Content: this.lessonContent
    };

    this.lessonsService.updateLesson(this.lessonTitle, lessonData).subscribe({
      next: (response: boolean) => {
        if (response) {
          this.router.navigate(['/courses']);
        } else {
          alert('Failed to update lesson. Please check the details and try again.');
        }
      },
      error: (error) => {
        console.error('Error updating lesson:', error);
        alert('An error occurred. Please try again.');
      }
    });
  }
}
