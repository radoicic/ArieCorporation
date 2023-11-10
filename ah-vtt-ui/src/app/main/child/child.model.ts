
export class Child {

    childId?: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    address?: string;
    sex?: number;
    nationalityCountryId: number;
    dob: string;
    avatar: string;
}

export class ChildListUI {
    id: number;
    name: string;
    age: string;
    sex: string;
    nationality: string;
    address: string;
    avatar: string;
}

export class GetChildUI {
    id: number;
    firstName: string;
    middleName?: string;
    lastName: string;
    address?: string;
    sex?: number;
    nationality?: number;
    dob?: string;
    avatar: string;
}

export interface IChangeEvent {
    id: number
}

export class Country {
    id: number;
    name: string;
}