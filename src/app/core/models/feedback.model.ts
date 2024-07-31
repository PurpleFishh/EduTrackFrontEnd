export enum FeedbackCategory {
    ContentQuality = 0,
    UserExperience = 1,
    TechnicalPerformance = 2,
    EducationalTools = 3,
    AssessmentAndFeedback = 4
}

export interface FeedbackDto {
    Name: string,
    Email: string,
    Title: string,
    Content: string,
    Stars: number,
    IsAnonymus: boolean,
    Category?: FeedbackCategory,
    // categoryString?: string,
    // dater?: Date
}

export interface FeedbackFiltersDto {
    byName?: string[],
    byEmail?: string[],
    byTitle?: string[],
    byCategories?: FeedbackCategory[],
    startDate?: Date | null,
    endDate?: Date | null,
    stars?: number[],
    isAnonymus?: boolean | null,
}