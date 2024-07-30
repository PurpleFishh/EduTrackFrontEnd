import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { Router } from '@angular/router';
import { AssignmentInventoryService } from 'src/app/core/services/assignment-inventory-service.service';
import { AssignmentDto } from 'src/app/core/models/assignment.model';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss']
})
export class AddLessonComponent {
  addLessonForm: FormGroup;
  courseTitle: string;
  teacherEmail: string;
  fileName: string = '';
  file!: File;
  assignment!: AssignmentDto; 

  constructor(
    private fb: FormBuilder,
    private lessonsService: LessonsService,
    private router: Router,
    private readonly assService: AssignmentInventoryService
  ) {
    this.courseTitle = localStorage.getItem('courseTitle') || 'aaa';
    this.teacherEmail = localStorage.getItem('teacherEmail') || 'teacher@teacher.com';

    this.addLessonForm = this.fb.group({
      lessonName: ['', Validators.required],
      lessonDescription: ['', Validators.required],
      lessonContent: ['', Validators.required],
      lessonDueDate: [''],
      assignmentTitle: ['', Validators.required],
      assignmentDueDate: [''],
      assignmentShortDescription: ['', Validators.required],
      assignmentTask: ['', Validators.required]
    });
  }

  onSubmit() {

    if (this.addLessonForm.valid) {
      const { lessonName, lessonDescription, lessonContent,assignmentTitle,assignmentShortDescription,assignmentTask } = this.addLessonForm.value;

      const lessonData = {
        name: lessonName,
        description: lessonDescription,
        lesson_Content: lessonContent
      };

      const assignmentData = {
        assignment_name: assignmentTitle,
        assignment_description: assignmentTask,
        assignment_preview:assignmentShortDescription
      }
      this.assService.addAssignment(assignmentData,this.file);

      this.lessonsService.addLesson(this.courseTitle, this.teacherEmail, lessonData).subscribe({
        next: (response: boolean) => {
          if (response) {
            this.router.navigate(['/courses']);
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

  isFormValid(): boolean {
    return this.assignment.assignment_name.trim() !== '' &&
           this.assignment.assignment_description.trim() !== '' &&
           this.assignment.assignment_preview.trim() !== '' &&
           this.file !== null;
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.file = input.files[0]
      this.fileName = this.file.name
    }
  }
}