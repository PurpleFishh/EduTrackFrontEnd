export interface AssignmentDisplayDto{
    assignment_name: string,
    assignment_description: string,
    assignment_file: string,
    assignment_preview: string
}

export interface AssignmentDto{
    assignment_name: string,
    assignment_description: string,
    assignment_preview: string
}

export interface AssignmentSolutionDto{
    solution_title: string,
    solution: string
}

export interface Grade{
    grade: string
}