import { Component, OnInit } from '@angular/core';
import { LessonsService } from 'src/app/core/services/lessons.service';
import { Router } from '@angular/router';
import { AssignmentInventoryService } from 'src/app/core/services/assignment-inventory-service.service';

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
  fileName: string = '';
  file!: File;
  assTitle!: string;
  assPreview!: string;
  assContent!: string;

  constructor(
    private lessonsService: LessonsService,
    private readonly assService: AssignmentInventoryService,
    private router: Router
  ) {
    this.courseTitle = localStorage.getItem('courseTitle') || 'aaa';
    this.lessonTitle = localStorage.getItem('lessonTitle') || 'ccc';
    this.lessonDescription = '';
    this.lessonContent = '';
  }

  ngOnInit() {
    this.loadLesson();
    this.loadAssignment();
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

  loadAssignment(){
    this.assService.getAssignment().subscribe({
      next: (assignments) => {
        
        if (assignments) {
          for(let assignment of assignments){
            this.assTitle = assignment.assignment_name;
            this.assPreview = assignment.assignment_preview;
            this.assContent = assignment.assignment_description;
          }
          
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
      lesson_Content: this.lessonContent,
      startDate: new Date(),
    };

    const assignmentData = {
      assignment_name:this.assTitle ,
      assignment_description:this.assContent ,
      assignment_preview: this.assPreview,
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

    this.assService.updateAssignment(this.lessonTitle,this.courseTitle, assignmentData,this.file).subscribe({
      next: (response: boolean) => {
        if (response) {
          this.router.navigate(['/courses']);
        } else {
          alert('Failed to update lesson. Please check the details and try again.');
        }
      },
      error: (error: any) => {
        console.error('Error updating lesson:', error);
        alert('An error occurred. Please try again.');
      }
    });
  }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.file = input.files[0]
      this.fileName = this.file.name
    }
  }

  
  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }
}