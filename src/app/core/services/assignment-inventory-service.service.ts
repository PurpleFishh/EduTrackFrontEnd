import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import {
  AssignmentDisplayDto,
  AssignmentSolutionDto,
  AssignmentDto,
  Grade,
} from '../models/assignment.model';
import { catchError, forkJoin, map, Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Result, StatusCodes } from '../models/result.model';
import { environment } from 'src/app/environments/environment';
import { LessonDisplayDto } from '../models/lesson.model';
import { AuthenticationService } from './authentication.service';
@Injectable({
  providedIn: 'root',
})
export class AssignmentInventoryService {
  readonly endpoint: string = 'Assignment';
  readonly endopint2: string = 'Lesson';
  grades: Grade[] = [];

  constructor(
    private readonly baseService: RestBaseService,
    private readonly auth: AuthenticationService
  ) {}

  public getAssignment(courseName: string = '', lessonTitle: string = '') {
    return this.baseService.get<AssignmentDisplayDto[]>(
      this.getCompleteUrlWithQuery(`${this.endpoint}/GetAssignment`, {
        CourseName: courseName,
        LessonTitle: lessonTitle,
      })
    );
  }

  public getLesson(courseName: string = '', lessonTitle: string = '') {
    return this.baseService.get<LessonDisplayDto>(
      this.getCompleteUrlWithQuery(`${this.endopint2}/GetLesson`, {
        courseTitle: courseName,
        lessonTitle: lessonTitle,
      })
    );
  }

  public getGrade(courseName: string = '', lessonTitle: string = '') {
    //const email = this.auth.getEmail();
    const email = 'user@yahoo.com';

    return this.baseService.get<Grade>(
      this.getCompleteUrlWithQuery(`${this.endpoint}/GetGrade`, {
        courseName: courseName,
        lessonTitle: lessonTitle,
        StudentEmail: email,
      })
    );
  }

  public deleteAssignment() {
    const courseName = localStorage.getItem('course') || 'Curs';
    const lessonTitle = localStorage.getItem('lesson') || 'Lectia 1';

    return this.baseService.deleteAss<boolean>(
      `${this.endpoint}/DeleteAssignment?CourseName=${courseName}&LessonTitle=${lessonTitle}`
    );
  }

  public getAllGrades(lessonTitle: string) {
    const courseName = localStorage.getItem('course') || 'Curs';
    const email = localStorage.getItem('email') || 'teacher@teacher.com';
    const queryParams = {
      courseName: courseName,
      lessonTitle: lessonTitle,
      StudentEmail: email,
    };

    return this.baseService.get<Grade>(
      this.getCompleteUrlWithQuery(`${this.endpoint}/GetGrade`, queryParams)
    );
  }

  updateAssignment(
    lessonTitle: string,
    courseName: string,
    assignment: AssignmentDto,
    file: File
  ): Observable<boolean> {
    const payload = {
      lessonTitle,
      assignmentData: assignment,
    };
    const formData = new FormData();
    formData.append('file', file);
    const url = `${this.endpoint}/EditAssignment?LessonTitle=${lessonTitle}&CourseName=${courseName}
    &Assignment_name=${assignment.assignment_name}
    &Assignment_description=${assignment.assignment_description}
    &Assignment_preview=${assignment.assignment_preview}`;
    return this.baseService.update(
      url,
      {}
    );
  }

  public addSolution(solution: AssignmentSolutionDto, file: File) {
    const courseName = localStorage.getItem('course') || 'Curs';
    const lessonTitle = localStorage.getItem('lesson') || 'Lectia 1';
    const email = localStorage.getItem('email') || 'teacher@teacher.com';

    const formData = new FormData();
    formData.append('file', file);
    formData.append('Solution_title', solution.solution_title);
    formData.append('Solution', solution.solution);
    formData.append('CourseName', courseName);
    formData.append('LessonTitle', lessonTitle);
    formData.append('StudentEmail', email);

    const queryString = `CourseName=${encodeURIComponent(
      courseName
    )}&LessonTitle=${encodeURIComponent(
      lessonTitle
    )}&StudentEmail=${encodeURIComponent(email)}
    &Solution_title=${encodeURIComponent(
      solution.solution_title
    )}&Solution=${encodeURIComponent(solution.solution)}`;

    return this.baseService
      .add<boolean, FormData>(`${this.endpoint}/Solve?${queryString}`, formData)
      .subscribe({
        next: (response) => {
          console.log('Solution submitted successfully:', response);
        },
        error: (error) => {
          console.error('Error submitting solution:', error);
          if (error.status === 400 && error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        },
      });
  }

  public addAssignment(assignment: AssignmentDto, file: File) {
    const courseName = localStorage.getItem('course') || 'Curs';
    const lessonTitle = localStorage.getItem('lesson') || 'Lectia 1';
    const email = localStorage.getItem('email') || 'teacher@teacher.com';

    const formData = new FormData();
    formData.append('file', file);

    const queryString = `CourseName=${encodeURIComponent(
      courseName
    )}&LessonTitle=${encodeURIComponent(lessonTitle)}
    &Assignment_name=${encodeURIComponent(assignment.assignment_name)}
    &Assignment_description=${encodeURIComponent(
      assignment.assignment_description
    )}
    &Assignment_preview=${encodeURIComponent(assignment.assignment_preview)}`;

    return this.baseService
      .add<boolean, FormData>(
        `${this.endpoint}/AddAssignment?${queryString}`,
        formData
      )
      .subscribe({
        next: (response) => {
          console.log('Assignment added successfully:', response);
        },
        error: (error) => {
          console.error('Error submitting assignment:', error);
          if (error.status === 400 && error.error && error.error.errors) {
            console.error('Validation errors:', error.error.errors);
          }
        },
      });
  }

  private getCompleteUrlWithQuery(
    url: string,
    queryParams: { [key: string]: string }
  ) {
    const queryString = Object.keys(queryParams)
      .map(
        (key) =>
          `${encodeURIComponent(key)}=${encodeURIComponent(queryParams[key])}`
      )
      .join('&');
    return `${url}?${queryString}`;
  }
}
