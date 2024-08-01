export interface AttendanceDto {
    studentEmail: string;
    LessonName: string;
    attended: boolean;
  }
export interface AttendanceDictionary 
{ 
    [lessonName: string]: AttendanceDto[] 
};
