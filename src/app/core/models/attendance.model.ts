export interface AttendanceDto {
    studentEmail: string;
    lessonName: string;
    attended: boolean;
  }
export interface AttendanceDictionary 
{ 
    [lessonName: string]: AttendanceDto[] 
};
