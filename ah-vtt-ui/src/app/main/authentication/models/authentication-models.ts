export class LoggedInResponse{
    token: string;
    claims: Claims;
}

export class Claims {
    userId: string;
    email: string;
    userModuleAccessViews: ModuleAccessView[];
    userRegionAssignments: RegionAssignment[]
}

export class ModuleAccessView{
    roleId: number;
    roleName: string;
    moduleId: number;
    moduleName: string;
    add: boolean;
    edit: boolean;
    view: boolean;
    delete: boolean;
}

export class RegionAssignment{
    countryId: boolean;
    provinceId?: boolean;
    districtId?: boolean;
    villageId?: boolean;
    sdpId?: boolean;
}