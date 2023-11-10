import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ChildData, ChildFormData } from '../flow.model';
import { FlowService } from '../flow.service';

@Component({
  selector: 'app-child-form',
  templateUrl: './child-form.component.html',
  styleUrls: ['./child-form.component.scss']
})
export class ChildFormComponent implements OnInit {
  @Input()
  countryOptions = [];
  @Input()
  sexOptions = [] // make readonly?
  @Input()
  sdpId = -1;
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
  wizardStep = -1;
  @Output()
  previous: EventEmitter<void> = new EventEmitter<void>();
  @Output()
  next: EventEmitter<void> = new EventEmitter<void>();
  childForm: FormGroup;
  childLookupForm: FormGroup;
  childFormData: ChildFormData = { index: -1, children: []};
  lookupChildren: ChildData[] = [];
  
  constructor(_formBuilder: UntypedFormBuilder, private _flowService: FlowService) { 
    this.childForm = _formBuilder.group({
      photo: ['', Validators.required],
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      dateOfBirth: [null, Validators.required],
      nationalityCountryId: [0, Validators.required],
      sex: [null],
    })
    this.childLookupForm = _formBuilder.group({
      firstName: ['', Validators.required],
      middleName: ['', Validators.required],
      lastName: ['', Validators.required],
      countryName: ['', Validators.required],
    })
    this._flowService.draftLoadEvent$.subscribe(async(draftId: number) => {
      await this.loadDraft(draftId);
    })
    this._flowService.saveAndClearEvent$.subscribe(async() => {
      await this.saveDraft()
      this.childForm.reset();
      this.childFormData = { index: -1, children: []}
      this.draftId = undefined;
    })
  }

  get formControls() {
    return this.childForm?.controls;
  }

  async ngOnInit(): Promise<void> {
    await this.loadDraft(this.draftId);
  }

  handleImage(imageDataUrl: string): void {
    this.formControls.photo.setValue(imageDataUrl);
  }

  async loadDraft(draftId: number){
    if(!this.draftId && !draftId)
      return;
    this.draftId = draftId;
    const serializedForm = await this._flowService.getFlowRegistrationDraft(this.wizardStep, this.sdpId, this.draftId).toPromise();
    if(serializedForm) {
      this.childFormData.children = (JSON.parse(serializedForm) as ChildData[]);
    }
  }

  async saveDraft(): Promise<void> {
    const serializedData = JSON.stringify(this.childFormData.children)
    this.draftId = await this._flowService.draftFlowRegistration(serializedData, this.sdpId, this.draftId, this.wizardStep).toPromise();
  }
  async previousClicked(): Promise<void> {
    await this.saveDraft();
    this.previous.next()
  }

  async nextClicked(): Promise<void> {
    await this.saveDraft();
    this.next.next()
  }

  async addFromFormAndNext(): Promise<void> {
    this.addFromForm();
    this.nextClicked();
  }

  addFromForm(){
    if(this.childFormData.index === -1){
      this.childFormData.children.push(this.childForm.value)
    }
    else{
      this.childFormData.children[this.childFormData.index] = this.childForm.value
    }
    this.childFormData.index = -1;
    this.childForm.reset();
  }

  deleteRow(index: number){
    this.childFormData.children.splice(index, 1);
  }

  editRow(index: number){
    const copy = Object.assign({}, this.childFormData.children[index]);
    this.childForm.setValue(copy);
    this.childFormData.index = index;
  }

  async doLookup(): Promise<void> {
    this.lookupChildren = await this._flowService.lookupChildren(this.childLookupForm.value).toPromise();
  }

  addFromLookup(child: ChildData){
    if(child.childId && this.childFormData.children.some(x => x.childId === child.childId))
      return;
    this.childFormData.children.push(child)
  }

  addFromLookupAndNext(child: ChildData){
    this.addFromLookup(child);
    this.nextClicked();
  }

  get labels(){
    if(this.childFormData.index === -1) {
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
