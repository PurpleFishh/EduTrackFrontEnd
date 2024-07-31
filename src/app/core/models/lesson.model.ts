export interface LessonDto {
  name: string;
  description: string;
  lesson_Content: string;
  startDate: Date;
}

export interface LessonDisplayDto {
  name: string;
  description: string;
  lesson_Content: string;
  lessonStatus: LessonStatus;
  startDate: Date;
}

export enum LessonStatus {
  NotStarted = 'not_started',
  WaitForStart = 'wait_for_start',
  InProgess = 'in_progress',
  Finished = 'finished',
}
