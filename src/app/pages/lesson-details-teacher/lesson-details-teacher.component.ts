import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentDisplayDto, AssignmentSolutionDto, Grade } from 'src/app/core/models/assignment.model';
import { CourseDisplayDto } from 'src/app/core/models/course.model';
import { LessonDisplayDto, LessonDto } from 'src/app/core/models/lesson.model';
import { AssignmentInventoryService } from 'src/app/core/services/assignment-inventory-service.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { LessonsService } from 'src/app/core/services/lessons.service';

@Component({
  selector: 'app-lesson-details-teacher',
  templateUrl: './lesson-details-teacher.component.html',
  styleUrls: ['./lesson-details-teacher.component.scss']
})
export class LessonDetailsTeacherComponent {
  current_assignment: AssignmentDisplayDto[] = []
  current_lesson!: LessonDisplayDto;
  current_course!: CourseDisplayDto;
  current_grade!: Grade;
  all_lessons: LessonDto[] = [];
  all_lessons_string: string[] = [];
  final_grade: number = 0;
  solution!: AssignmentSolutionDto; 
  fileName: string = '';
  file!: File;
  iterations: number = 0;
  

  constructor(private readonly lessonSevice: LessonsService,private readonly courseService: CoursesService,private readonly assService: AssignmentInventoryService,private readonly routerActive: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(){
    this.solution = {
      solution_title: '',
      solution: ''
    };
    this.assService.getAssignment().subscribe(assignment => {
      //console.log(assignment);
      this.current_assignment = assignment;
    });
    this.assService.getLesson().subscribe(lesson => {
      //console.log(lesson);
      this.current_lesson = lesson;
    });
    this.courseService.getCourse().subscribe(course => {
      //console.log(course);
      this.current_course = course;
    });
    this.assService.getGrade().subscribe(grade => {
      //console.log(grade);
      this.current_grade = grade;
    });
    this.lessonSevice.getAllLessons().subscribe(lessons => {
      //console.log(lessons);
      for(let lesson of lessons){
        this.all_lessons_string.push(lesson.name)
      }
      //console.log(this.all_lessons_string);
      for(let lesson of this.all_lessons_string){
        this.iterations ++;
        this.assService.getAllGrades(lesson).subscribe(grade =>{
          this.final_grade += Number(grade);
          //console.log(this.iterations);
        });
      }
      this.final_grade = this.final_grade/this.iterations;
      
      
    });
      
  }


  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;

    if (input.files && input.files.length > 0) {
      this.file = input.files[0]
      this.fileName = this.file.name
    }
  }

  isFormValid(): boolean {
    return this.solution.solution_title.trim() !== '' &&
           this.solution.solution.trim() !== '' &&
           this.file !== null;
  }
  
  onSubmit(){
    if(this.isFormValid()){
      this.assService.addSolution(this.solution,this.file);
      return true
    }else{
      return false
    }
    
  }

  triggerFileInput() {
    const fileInput = document.getElementById('fileInput') as HTMLInputElement;
    fileInput.click();
  }

  goToEditLesson() {
    this.router.navigateByUrl('/update-lesson'); 
  }

  confirmDelete(): void {
    const result = window.confirm('Select ok to delete lesson or cancel to delete assignment');
    
    if (result) {
      this.deleteLesson();
    } else {
      this.deleteAssignment();
    }
  }

  deleteLesson(){
    this.lessonSevice.deleteLesson().subscribe(
      response => console.log('Delete response:', response),
      error => console.error('Delete error:', error)
    );
    window.location.reload();
  }

  deleteAssignment(){
    this.assService.deleteAssignment().subscribe(
      response => console.log('Delete response:', response),
      error => console.error('Delete error:', error)
    );
    window.location.reload();
  }

}
