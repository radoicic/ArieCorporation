import { ModuleAccessView, RegionAssignment } from "app/main/authentication/models/authentication-models";

export interface Session{
    jwt: string;
    email: string;
    userId: string;
    userModuleAccessViews: ModuleAccessView[];
    userRegionAssignments: RegionAssignment[];
}