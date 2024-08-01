import { Injectable } from '@angular/core';
import { RestBaseService } from './rest-base.service';
import {
  AssignmentDisplayDto,
  AssignmentSolutionDto,
  AssignmentDto,
  AllAssignments,
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

  public getAssignment(courseName: string, lessonTitle: string) {
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
    const email = this.auth.getEmail();
    //const email = 'teacher@teacher.com';

    return this.baseService.get<Grade>(
      this.getCompleteUrlWithQuery(`${this.endpoint}/GetGrade`, {
        courseName: courseName,
        lessonTitle: lessonTitle,
        StudentEmail: email,
      })
    );
  }

  getStudentGrade(courseName: string, lessonTitle: string, email: string) {
    const url = `${this.endpoint}/GetGrade?CourseName=${courseName}&LessonTitle=${lessonTitle}&StudentEmail=${email}`;
    return this.baseService.get<number[]>(url);
}




  public deleteAssignment(courseName: string, lessonTitle: string) {
    return this.baseService.deleteAss<boolean>(
      `${this.endpoint}/DeleteAssignment?CourseName=${courseName}&LessonTitle=${lessonTitle}`
    );
  }

  public getAllGrades(lessonTitle: string) {
    const courseName = localStorage.getItem('course') || 'aaa';
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
    return this.baseService.update(url, formData);
  }

  public addSolution(
    courseName: string,
    lessonTitle: string,
    solution: AssignmentSolutionDto,
    file: File
  ) {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('Solution_title', solution.solution_title);
    formData.append('Solution', solution.solution);
    formData.append('CourseName', courseName);
    formData.append('LessonTitle', lessonTitle);

    const queryString = `CourseName=${encodeURIComponent(
      courseName
    )}&LessonTitle=${encodeURIComponent(lessonTitle)}
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

  public addAssignment(
    courseName: string,
    lessonTitle: string,
    assignment: AssignmentDto,
    file: File
  ) {
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

  public getSolution(
    courseName: string,
    lessonTitle: string,
    studentEmail: string
  ) {
    const queryParams = {
      courseName: courseName,
      lessonTitle: lessonTitle,
      StudentEmail: studentEmail,
    };

    return this.baseService.get<AssignmentSolutionDto[]>(
      this.getCompleteUrlWithQuery(`${this.endpoint}/GetSolution`, queryParams)
    );
  }

  public getAllAssignmentsSent(){
    const courseName = localStorage.getItem('course') || 'plm';
    const lessonTitle = localStorage.getItem('lesson') || 'string';
    const queryParams = {
      courseName: courseName,
      LessonTitle: lessonTitle
    };
    return this.baseService.get<AllAssignments[][]>(this.getCompleteUrlWithQuery(`${this.endpoint}/GetAllAssignmentsSent`, queryParams));
  }

  public gradeAssignment(
    courseName: string,
    lessonTitle: string,
    studentEmail: string,
    grade: number
  ) {
    const queryParams = {
      CourseName: courseName,
      LessonTitle: lessonTitle,
      Grade: grade.toString(),
      StudentEmail: studentEmail,
    };
    const formData = new FormData();
    formData.append('CourseName', courseName);
    formData.append('StudentEmail', studentEmail);
    formData.append('LessonTitle', lessonTitle);
    formData.append('Grade', grade.toString());

    return this.baseService
      .addData<boolean>(
        this.getCompleteUrlWithQuery(
          `${this.endpoint}/GradeAssignment`,
          queryParams
        ),
        formData
      )
      .subscribe();
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
