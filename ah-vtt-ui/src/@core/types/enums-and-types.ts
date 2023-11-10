export type AuthenticationStep = 'form' | 'mfa';
export type ForgotPasswordStep = 'main' | 'form';
export type FlowRegistrationStep = 'guardian' | 'child' | 'travel' | 'vaccine';
export enum Sex{
    Other,
    Male,
    Female
}
export enum ModeOfTransport{
    Walk,
    Bicycle,
    Motorcycle,
    Car,
    Airplane,
    Other
}

export enum AddPictureMode{
    Upload,
    Click
}

export type FlowRecordSdp = number | undefined | null;

export enum FlowRecordContextAction{
    SetSdp,
    OpenDraft,
    SaveAndCloseDraft
}