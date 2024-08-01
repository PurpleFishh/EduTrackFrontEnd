import { UserRoles } from "./user-role.model";

export interface LoggedCredentialsDto {
    email: string;
    username: string;
    jwtToken: string;
    role: UserRoles;
}