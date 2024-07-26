export interface CourseDisplayDto {
    name: string;
    prerequisites: string;
    difficulty: string;
    shortDescription: string;
    imageContents: string;
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

