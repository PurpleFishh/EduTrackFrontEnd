import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AssignmentDisplayDto, Grade } from 'src/app/core/models/assignment.model';
import { CourseDisplayDto } from 'src/app/core/models/course.model';
import { LessonDisplayDto, LessonDto } from 'src/app/core/models/lesson.model';
import { AssignmentInventoryService } from 'src/app/core/services/assignment-inventory-service.service';
import { CoursesService } from 'src/app/core/services/courses.service';
import { LessonsService } from 'src/app/core/services/lessons.service';

@Component({
  selector: 'app-lesson-not-finished-details',
  templateUrl: './lesson-not-finished-details.component.html',
  styleUrls: ['./lesson-not-finished-details.component.scss']
})
export class LessonNotFinishedDetailsComponent {
  current_assignment: AssignmentDisplayDto[] = []
  current_lesson!: LessonDisplayDto;
  current_course!: CourseDisplayDto;
  current_grade!: Grade;
  all_lessons: LessonDto[] = [];
  all_lessons_string: string[] = [];
  iterations: number = 0;
  final_grade: number = 0;

  constructor(private readonly lessonSevice: LessonsService,private readonly courseService: CoursesService,private readonly assService: AssignmentInventoryService,private readonly routerActive: ActivatedRoute, private readonly router: Router) {}

  ngOnInit(){
    this.assService.getAssignment().subscribe(assignment => {
      console.log(assignment);
      this.current_assignment = assignment;
    });
    this.assService.getLesson().subscribe(lesson => {
      console.log(lesson);
      this.current_lesson = lesson;
    });
    this.courseService.getCourse().subscribe(course => {
      console.log(course);
      this.current_course = course;
    });
    this.assService.getGrade().subscribe(grade => {
      console.log(grade);
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
}
