import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentInventoryService } from 'src/app/core/services/assignment-inventory-service.service';
import { AssignmentDto } from 'src/app/core/models/assignment.model';

@Component({
  selector: 'app-add-lesson',
  templateUrl: './add-lesson.component.html',
  styleUrls: ['./add-lesson.component.scss'],
})
export class AddLessonComponent implements OnInit {
  addLessonForm: FormGroup;
  courseTitle!: string;
  lessonTitle: string | undefined;
  teacherEmail: string;
  fileName: string = '';
  file!: File;
  assignment!: AssignmentDto;

  constructor(
    private fb: FormBuilder,
    private lessonsService: LessonsService,
    private router: Router,
    private activeRouter: ActivatedRoute,
    private readonly assService: AssignmentInventoryService
  ) {
    this.teacherEmail =
      localStorage.getItem('teacherEmail') || 'teacher@teacher.com';

    this.addLessonForm = this.fb.group({
      lessonName: ['', Validators.required],
      lessonDescription: ['', Validators.required],
      lessonContent: ['', Validators.required],
      lessonDueDate: ['', Validators.required],
      assignmentTitle: ['', Validators.required],
      assignmentShortDescription: ['', Validators.required],
      assignmentTask: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.activeRouter.params.subscribe((params) => {
      this.courseTitle = params['curs'];

      const url = this.router.url.toLocaleLowerCase().split('/');
      if (url[1] == 'add' && url[2] == 'course' && url[4] == 'lesson') return;

      this.lessonTitle = params['lesson'];
      if (this.lessonTitle) {
        this.lessonsService
          .getLesson(this.courseTitle, this.lessonTitle)
          .subscribe({
            next: (lesson) => {
              if (lesson) {
                this.addLessonForm.controls['lessonName'].setValue(lesson.name);
                this.addLessonForm.controls['lessonDescription'].setValue(
                  lesson.description
                );
                this.addLessonForm.controls['lessonContent'].setValue(
                  lesson.lesson_Content
                );
                this.addLessonForm.controls['lessonDueDate'].setValue(
                  lesson.startDate
                );
              }
            },
            error: (error) => {
              console.error('Error loading lesson:', error);
            },
          });
        this.assService
          .getAssignment(this.courseTitle, this.lessonTitle)
          .subscribe({
            next: (assignments) => {
              if (assignments) {
                for (let assignment of assignments) {
                  this.addLessonForm.controls['assignmentTitle'].setValue(
                    assignment.assignment_name
                  );
                  this.addLessonForm.controls[
                    'assignmentShortDescription'
                  ].setValue(assignment.assignment_preview);
                  this.addLessonForm.controls['assignmentTask'].setValue(
                    assignment.assignment_description
                  );
                  this.fileName = assignment.assignment_file;
                }
              }
            },
            error: (error) => {
              console.error('Error loading lesson:', error);
            },
          });
      } else this.router.navigateByUrl('unauthorized');
    });
  }

  onSubmit() {
    if (this.addLessonForm.valid) {
      const {
        lessonName,
        lessonDescription,
        lessonContent,
        assignmentTitle,
        assignmentShortDescription,
        assignmentTask,
        lessonDueDate,
      } = this.addLessonForm.value;

      const lessonData = {
        name: lessonName,
        description: lessonDescription,
        lesson_Content: lessonContent,
        startDate: lessonDueDate,
      };

      const assignmentData = {
        assignment_name: assignmentTitle,
        assignment_description: assignmentTask,
        assignment_preview: assignmentShortDescription,
      };

      lessonData.startDate.setHours(lessonData.startDate.getHours() + 5);

      // Lesson Edit
      if (this.lessonTitle) {
        this.lessonsService
          .updateLesson(this.lessonTitle, lessonData)
          .subscribe({
            next: (response: boolean) => {
              if (response) {
                this.router.navigateByUrl('/course/' + this.courseTitle);
              } else {
                alert(
                  'Failed to update lesson. Please check the details and try again.'
                );
              }
            },
            error: (error) => {
              console.error('Error updating lesson:', error);
              alert('An error occurred. Please try again.');
            },
          });
        if (this.file === undefined || this.file === null)
          this.file = new File([''], this.fileName);
        this.assService
          .updateAssignment(
            this.lessonTitle,
            this.courseTitle,
            assignmentData,
            this.file
          )
          .subscribe({
            next: (response: boolean) => {
              if (response) {
                this.router.navigateByUrl('/course/' + this.courseTitle);
              } else {
                alert(
                  'Failed to update lesson. Please check the details and try again.'
                );
              }
            },
            error: (error: any) => {
              console.error('Error updating lesson:', error);
              alert('An error occurred. Please try again.');
            },
          });
      } else {
        // Lesson Add

        this.lessonsService
          .addLesson(this.courseTitle, this.teacherEmail, lessonData)
          .subscribe({
            next: (response: boolean) => {
              if (response) {
                this.router.navigateByUrl('/course/' + this.courseTitle);
              } else {
                alert(
                  'Failed to add lesson. Please check the details and try again.'
                );
              }
            },
            error: (error) => {
              console.error('Error adding lesson:', error);
              alert('An error occurred. Please try again.');
            },
          });
        this.assService.addAssignment(
          this.courseTitle,
          lessonData.name,
          assignmentData,
          this.file
        );
      }
    }
  }

  isFormValid(): boolean {
    return (
      this.assignment.assignment_name.trim() !== '' &&
      this.assignment.assignment_description.trim() !== '' &&
      this.assignment.assignment_preview.trim() !== '' &&
      this.file !== null
    );
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.file = input.files[0];
      this.fileName = this.file.name;
    }
  }
}
