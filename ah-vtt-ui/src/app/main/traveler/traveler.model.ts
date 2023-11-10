
export class Traveler {

    TravelerId?: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    address?: string;
    sex?: number;
    nationalityCountryId: number;
    phoneNumber: string;
    dob: string;
    email: string;
}

export class TravelerListUI {
    id: number;
    name: string;
    age: number;
    sex: string;
    nationality: string;
    address: string;
    phoneNumber: string;
    avatar: string;
    email: string;
}

export class GetTravelerUI {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    address?: string;
    sex?: number;
    nationality?: number;
    phoneNumber?: string;
    dob?: string;
    email: string;
}

export interface IChangeEvent {
    id: number
}

export class Country {
    id: number;
    name: string;
}