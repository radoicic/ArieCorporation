import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { RegionType } from 'app/main/region/region.model';
import { RegionService } from 'app/main/region/region.service';
import { TravelFormData, TravelFormOptions } from '../flow.model';
import { FlowService } from '../flow.service';

@Component({
  selector: 'app-travel-form',
  templateUrl: './travel-form.component.html',
  styleUrls: ['./travel-form.component.scss']
})
export class TravelFormComponent {
  @Input()
  countryOptions = [];
  @Input()
  sdpId = -1;
  @Input()
  wizardStep = -1;
  private _draftId: number = undefined;
  @Input()
  get draftId(){
    return this._draftId;
  }
  set draftId(draftId){
    this._draftId = draftId;
    this.draftIdUpdated.next(this._draftId);
  }
  @Output()
  draftIdUpdated: EventEmitter<number> = new EventEmitter<number>();
  @Input()
  modeOfTransportOptions = []
  @Input()
  travelFormData: TravelFormData;
  @Output()
  next: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  previous: EventEmitter<void> = new EventEmitter<void>();
  travelForm: FormGroup
  options: TravelFormOptions = {} as TravelFormOptions;
  constructor(_formBuilder: UntypedFormBuilder, private _regionService: RegionService, private _flowService: FlowService) { 
    this.travelForm = _formBuilder.group({
      originCountryId: [0, Validators.required],
      destinationCountryId: [0, Validators.required],
      originProvinceId: [0, Validators.required],
      destinationProvinceId: [0, Validators.required],
      originDistrictId: [0, Validators.required],
      destinationDistrictId: [0, Validators.required],
      originVillageId: [0, Validators.required],
      destinationVillageId: [0, Validators.required],
      modeOfTransport: [null, Validators.required],
      travelReason: [null, Validators.required],
    })
    this._flowService.draftLoadEvent$.subscribe(async(draftId: number) => {
      await this.loadDraft(draftId);
    })
    this._flowService.saveAndClearEvent$.subscribe(async() => {
      await this.saveDraft()
      this.travelForm.reset();
      this.draftId = undefined;
    })
  }

  async ngOnInit(): Promise<void> {
    await this.loadDraft(this.draftId)
  }

  async loadDraft(draftId: number){
    if(!this.draftId && !draftId)
      return;
    this.draftId = draftId;
    const serializedForm = await this._flowService.getFlowRegistrationDraft(this.wizardStep, this.sdpId, this.draftId).toPromise();
    if(!serializedForm) {
      return;
    }
    const travelFormData: TravelFormData = JSON.parse(serializedForm);
    this.travelForm.controls.originCountryId.setValue(travelFormData.originCountryId);
    await this.onControlChange(RegionType.Country, 'origin', 'originCountryId');
    this.travelForm.controls.destinationCountryId.setValue(travelFormData.destinationCountryId);
    await this.onControlChange(RegionType.Country, 'destination', 'destinationCountryId');
    this.travelForm.controls.originProvinceId.setValue(travelFormData.originProvinceId);
    await this.onControlChange(RegionType.Province, 'origin', 'originProvinceId');
    this.travelForm.controls.destinationProvinceId.setValue(travelFormData.destinationProvinceId);
    await this.onControlChange(RegionType.Province, 'destination', 'destinationProvinceId');
    this.travelForm.controls.originDistrictId.setValue(travelFormData.originDistrictId);
    await this.onControlChange(RegionType.District, 'origin', 'originDistrictId');
    this.travelForm.controls.destinationDistrictId.setValue(travelFormData.destinationDistrictId);
    await this.onControlChange(RegionType.District, 'destination', 'destinationDistrictId');
    this.travelForm.controls.originVillageId.setValue(travelFormData.originVillageId);
    this.travelForm.controls.destinationVillageId.setValue(travelFormData.destinationVillageId);
    this.travelForm.controls.modeOfTransport.setValue(travelFormData.modeOfTransport);
    this.travelForm.controls.travelReason.setValue(travelFormData.travelReason);
  }

  async saveDraft(): Promise<void> {
    var serializedData = JSON.stringify(this.travelForm.value)
    this.draftId = await this._flowService.draftFlowRegistration(serializedData, this.sdpId, this.draftId, this.wizardStep).toPromise();
  }

  async nextClicked(): Promise<void> {
    await this.saveDraft()
    this.next.next()
  }

  async previousClicked(): Promise<void> {
    await this.saveDraft()
    this.previous.next()
  }

  async onControlChange(regionType: RegionType, location: 'origin' | 'destination', changeControlName: string): Promise<void> {
    const targetRegionType = TravelFormComponent.prepareKey(regionType);
    const targetOptionsKey = `${location}${targetRegionType}`;
    const detailsResult = await this._regionService.getRegionDetails(this.travelForm.value[changeControlName], regionType).toPromise();
    this.options[targetOptionsKey] = detailsResult.subRegions
    this.travelForm.controls[`${targetOptionsKey}Id`].reset()
  }
  private static prepareKey(regionType: RegionType): string {
    switch(regionType){
      case RegionType.Country:
        return 'Province';
      case RegionType.Province:
        return 'District';
      case RegionType.District:
        return 'Village';
    }
  }

}
