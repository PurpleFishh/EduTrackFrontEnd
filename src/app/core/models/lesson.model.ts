export interface LessonDto {
    name: string;
    description: string;
    lesson_Content: string;
    startDate: Date;
}

export interface LessonDisplayDto {
    name: string,
    description: string,
    lesson_Content: string,
    lessonStatus: string,
    startDate: Date;
}