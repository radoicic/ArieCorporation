import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormBuilder, FormGroup } from '@angular/forms';
import { VaccineFormData } from '../flow.model';
import { FlowService } from '../flow.service';

@Component({
  selector: 'app-vaccine-form',
  templateUrl: './vaccine-form.component.html',
  styleUrls: ['./vaccine-form.component.scss']
})
export class VaccineFormComponent implements OnInit {
  vaccineForm: FormGroup;
  @Input()
  sdpId: number = -1;
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
  wizardStep: number = -1;
  @Output()
  previous: EventEmitter<void> = new EventEmitter<void>();
  constructor(private _formBuilder: UntypedFormBuilder, private _flowService: FlowService) { 
    this.vaccineForm = _formBuilder.group({
      cardPhoto: ['']
    })
    this._flowService.draftLoadEvent$.subscribe(async(draftId: number) => {
      await this.loadDraft(draftId);
    })
    this._flowService.saveAndClearEvent$.subscribe(async() => {
      await this.saveDraft()
      this.vaccineForm.reset();
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
    if(serializedForm) {
      this.vaccineForm.setValue(JSON.parse(serializedForm) as VaccineFormData);
    }
  }

  async previousClicked(): Promise<void> {
    await this.saveDraft();
    this.previous.next()
  }

  async saveDraft(): Promise<void> {
    const serializedData = JSON.stringify(this.vaccineForm.value)
    this.draftId = await this._flowService.draftFlowRegistration(serializedData, this.sdpId, this.draftId, this.wizardStep).toPromise();
  }

  async submitClicked(): Promise<void> {
    await this.saveDraft();
    await this._flowService.submitDraft(this.draftId).toPromise();
    this
  }

  get formControls(){
    return this.vaccineForm.controls;
  }

  public handleImage(imageDataUrl: string): void {
    this.formControls.cardPhoto.setValue(imageDataUrl);
  }

}
