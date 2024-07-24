export interface Result<T> {
    success: boolean;
    error?: ResultError;
    value?: T;
}

export interface ResultError {
    status: StatusCodes;
    message: string;
}
export enum StatusCodes {
    Info = "info",
    Success = "success",
    Error = "error",
    Warn = "warn"
  }