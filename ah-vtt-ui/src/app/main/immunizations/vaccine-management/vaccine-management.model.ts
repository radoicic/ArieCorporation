import { NgbDate } from "@ng-bootstrap/ng-bootstrap";

export interface Vaccine {
  vaccineCategoryId: number;
  vaccineCategoryName: string;
  vaccineManufacturerData: VaccineManufacturer[];
  vaccineDoseData: VaccineDose[];
}

export interface VaccineManufacturer {
  vaccineManufacturerId:number;
  comments:             string;
  manufacturerName:     string;
  lot:                  string;
  quantity:             number;
  expiration:           string | Date | NgbDate;
  visedition:           string | Date | NgbDate;
  dose:                 number;
  unitId:               number;
  refillDose:           number;
}

export interface VaccineDose{
  vaccineDoseName:      string;
  doseNo:               number;
  predictedStartDateId: number;
  predictedEndDateId:   number;
}

export interface FormOptions{
  unitOptions: UnitOption[];
  predictedDateOptions: PredictedDateOption[];
}

export interface UnitOption{
  unitId: number;
  unitName: string;
}

export interface PredictedDateOption {
  predictedDateId: number;
  predictedDateName: string;
}