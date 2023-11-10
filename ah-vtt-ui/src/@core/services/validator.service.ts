import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export class ValidatorService{
    private readonly latitudePattern = /^(-?[1-8]?\d(?:\.\d{1,7})?|90(?:\.0{1,7})?)$/;
    private readonly longitudePatten = /^(-?(?:1[0-7]|[1-9])?\d(?:\.\d{1,7})?|180(?:\.0{1,7})?)$/;
    latitude(): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null => {
            if(!control.value){
                return null;
            }
            const match = this.latitudePattern.test(control.value)
            return !match ? {latitude: {value: control.value}} : null;
        }
    }
    longitude(): ValidatorFn{
        return (control: AbstractControl): ValidationErrors | null => {
            if(!control.value){
                return null;
            }
            const match = this.longitudePatten.test(control.value)
            return !match ? {longitude: {value: control.value}} : null;
        }
    }
}