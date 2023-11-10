export enum RegionType {
    Country,
    Province,
    District,
    Village,
    Sdp
}

export class Region {
    regionType?: RegionType;
    id: number;
    name: string;
    lat?: number;
    long?: number;
    subRegions?: Region[];
    parentCountry?: Region;
    parentProvince?: Region;
    parentDistrict?: Region;
    parentVillage?: Region;
    provinceCount: number;
    districtCount: number;
    villageCount: number;
    sdpCount: number;
    smallCode?: string;
    lookupCountryId?: number;
}

export interface ILookupRegion{
    id: number;
    name: string;
    smallCode: string;
}

export interface RegionViewLabels{
    pageHeader: string;
    addButton: string;
    addModalHeader: string;
    editModalHeader: string;
}