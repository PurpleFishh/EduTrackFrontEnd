export interface CourseDisplayDto {
    name: string;
    prerequisites: string;
    difficulty: string;
    shortDescription: string;
    imageContents: string;
}
export interface CourseDto {
    name: string;
    prerequisites: string;
    difficulty: string;
    image: string;
    description: string;
    shortDescription: string;
    category: string;
    learningTopics: string;
    duration: number;
    teacherEmail: string;
    imageContents: string
}
export interface CoursesFilterDto {
    categories: string[];
    difficulties: string[];
    prerequistes: string[];
}
export interface CoursesFilter {
    search: string;
    sortBy: string;
    categories: string;
    difficulties: string;
    prerequistes: string[];
}

