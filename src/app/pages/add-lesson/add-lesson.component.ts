import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent {
  addLessonForm: FormGroup;
  courseTitle: string;
  teacherEmail: string;

  constructor(
    private fb: FormBuilder,
    private lessonsService: LessonsService,
    private router: Router
  ) {
    this.courseTitle = localStorage.getItem('courseTitle') || 'Franceza';
    this.teacherEmail = localStorage.getItem('teacherEmail') || 'teacher@teacher.com';

    this.addLessonForm = this.fb.group({
      lessonName: ['', Validators.required],
      lessonDescription: ['', Validators.required],
      lessonContent: ['', Validators.required],
      lessonDueDate: [''],
      assignmentTitle: [''],
      assignmentDueDate: [''],
      assignmentShortDescription: [''],
      assignmentTask: ['']
    });
  }

  onSubmit() {
    if (this.addLessonForm.valid) {
      const { lessonName, lessonDescription, lessonContent } = this.addLessonForm.value;

      const lessonData = {
        name: lessonName,
        description: lessonDescription,
        content: lessonContent
      };

      this.lessonsService.addLesson(this.courseTitle, this.teacherEmail, lessonData).subscribe({
        next: (response: boolean) => {
          if (response) {
            this.router.navigate(['/lessons']);
          } else {
            alert('Failed to add lesson. Please check the details and try again.');
          }
        },
        error: (error) => {
          console.error('Error adding lesson:', error);
          alert('An error occurred. Please try again.');
        }
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
