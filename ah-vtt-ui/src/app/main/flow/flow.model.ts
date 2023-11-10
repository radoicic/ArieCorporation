import { ModeOfTransport, Sex } from "@core/types";
import { NgOption } from "@ng-select/ng-select";

export interface FlowFormData{
    guardianInformation?: GuardianFormData;
    childInformation?: ChildFormData;
    travelInformation?: TravelFormData;
    vaccineInformation?: VaccineFormData;
}

export interface ChildData{
    childId?: number;
    photo: string,
    firstName: string,
    middleName: string,
    lastName: string,
    dateOfBirth: Date,
    nationalityCountryId: number,
    sex: Sex
}

export interface GuardianData{
    travelerId?: number;
    firstName: string;
    middleName: string;
    lastName: string;
    dateOfBirth: Date;
    address: string;
    sex: Sex;
    nationalityCountryId: number;
    phoneNumber: string;
    email: string;
}

export interface GuardianFormData{
    index: number;
    guardians: GuardianData[]
}

export interface ChildFormData{
    index: number;
    children: ChildData[]
}

export interface TravelFormData{
    originCountryId: number;
    originProvinceId: number;
    originDistrictId: number;
    originVillageId: number;
    destinationCountryId: number;
    destinationProvinceId: number;
    destinationDistrictId: number;
    destinationVillageId: number;
    travelReason: string;
    modeOfTransport: ModeOfTransport;
}

export interface VaccineFormData{
    cardPhoto: string;
}

export interface TravelFormOptions{
    originProvince: NgOption[];
    originDistrict: NgOption[];
    originVillage: NgOption[];
    destinationProvince: NgOption[];
    destinationDistrict: NgOption[];
    destinationVillage: NgOption[];
}

export interface FlowRecordContext{
    sdpId: number;
    draftId?: number;
}

export interface Draft {
    sdpId: number;
    draftId: number;
    lastSavedAtUtc: Date;
}

export interface LoadDraftRequest extends FlowRecordContext{
    flowRegistrationStep: number
}

export interface LookupRequest{
    firstName: string;
    middleName: string;
    lastName: string;
    countryName: string;
}
