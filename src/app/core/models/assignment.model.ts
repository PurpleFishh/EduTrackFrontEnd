export interface AssignmentDisplayDto {
  assignment_name: string;
  assignment_description: string;
  assignment_file: string;
  assignment_preview: string;
}

export interface AssignmentDto {
  assignment_name: string;
  assignment_description: string;
  assignment_preview: string;
}

export interface AssignmentSolutionDto {
  solution_title: string;
  solution: string;
  fileName: string;
}

export interface Grade {
  grade: string;
}

export interface MenuItem {
  label: string;
}

export interface Student {
  first_name: string;
  last_Name: string;
  email: string;
}

export interface AllAssignments {
  student: Student;
  lesson_name: string;
  grade: number;
}

export interface StudentGrade {
  student: Student;
  lesson_name: string;
  grade: number;
}

export interface AttendanceDto {
  studentEmail: string;
  LessonName: string;
  attended: boolean;
}
export interface AttendanceDictionary {
  [lessonName: string]: AttendanceDto[];
}
