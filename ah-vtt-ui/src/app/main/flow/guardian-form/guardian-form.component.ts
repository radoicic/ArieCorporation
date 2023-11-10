import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { GuardianData, GuardianFormData } from '../flow.model'
import { FlowService } from '../flow.service';

@Component({
  selector: 'app-guardian-form',
  templateUrl: './guardian-form.component.html',
  styleUrls: ['./guardian-form.component.scss']
})
export class GuardianFormComponent implements OnInit{
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
  countryOptions = [];
  @Input()
  sexOptions = [] // make readonly?
  @Input()
  sdpId = -1;
  
  @Input()
  wizardStep: number = -1;
  @Output()
  next: EventEmitter<void> = new EventEmitter<void>();
  
  guardianForm: FormGroup;
  guardianLookupForm: FormGroup;
  guardianFormData: GuardianFormData = { index: -1, guardians: []};
  lookupGuardians: GuardianData[] = [];

  constructor(_formBuilder: UntypedFormBuilder, private _flowService: FlowService, private ref: ChangeDetectorRef) { 
    this.guardianForm = _formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      phoneNumber: ['', Validators.required],
      email: [''],
      nationalityCountryId: [0, Validators.required],
      sex: [null]
    })
    this.guardianLookupForm = _formBuilder.group({
      firstName: [''],
      middleName: [''],
      lastName: [''],
      countryName: [''],
    })
    this._flowService.draftLoadEvent$.subscribe(async(draftId: number) => {
      await this.loadDraft(draftId);
    })
    this._flowService.saveAndClearEvent$.subscribe(async() => {
      await this.saveForm()
      this.guardianForm.reset();
      this.guardianFormData = { index: -1, guardians: [] }
      this.draftId = undefined;
    })
  }
  async ngOnInit(): Promise<void> {
    await this.loadDraft(this.draftId);
  }

  async loadDraft(draftId: number){
    if(!this.draftId && !draftId)
      return;
    this.draftId = draftId;
    var serializedForm = await this._flowService.getFlowRegistrationDraft(this.wizardStep, this.sdpId, this.draftId).toPromise();
    if(serializedForm) {
      this.guardianFormData.guardians = JSON.parse(serializedForm);
    }
  }

  async nextClicked(): Promise<void> {
    await this.saveForm();
    this.next.next()
  }

  async saveForm(){
    var serializedData = JSON.stringify(this.guardianFormData.guardians)
    this.draftId = await this._flowService.draftFlowRegistration(serializedData, this.sdpId, this.draftId, this.wizardStep).toPromise();
    console.log(this.draftId)
  }

  addFromFormAndNext() {
    this.addFromForm();
    this.nextClicked();
  }

  addFromForm(){
    if(this.guardianFormData.index === -1){
      this.guardianFormData.guardians.push(this.guardianForm.value)
    }
    else{
      this.guardianFormData.guardians[this.guardianFormData.index] = this.guardianForm.value
    }
    this.guardianFormData.index = -1;
    this.guardianForm.reset();
  }

  addFromLookup(guardian: GuardianData){
    if(guardian.travelerId && this.guardianFormData.guardians.some(x => x.travelerId === guardian.travelerId))
      return;
    this.guardianFormData.guardians.push(guardian)
  }

  deleteRow(index: number){
    this.guardianFormData.guardians.splice(index, 1);
  }

  editRow(index: number){
    const copy = Object.assign({}, this.guardianFormData.guardians[index]);
    this.guardianForm.setValue(copy);
    this.guardianFormData.index = index;
  }

  async doLookup(): Promise<void> {
    this.lookupGuardians = await this._flowService.lookupGuardians(this.guardianLookupForm.value).toPromise();
  }

  addFromLookupAndNext(guardian: GuardianData){
    this.addFromLookup(guardian);
    this.nextClicked();
  }

  get labels(){
    if(this.guardianFormData.index === -1) {
      return {
        grid: 'Add',
        next: 'Add And Next'
      }
    }
    else {
      return {
        grid: 'Update',
        next: 'Update And Next'
      }
    }
  }

}
