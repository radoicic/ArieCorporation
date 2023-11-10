import { Component, ElementRef, OnInit, TemplateRef, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FlowRecordContextAction, FlowRegistrationStep, ModeOfTransport, Sex } from '@core/types';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { AppService } from 'app/app.service';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { Region } from 'app/main/region/region.model';
import { RegionService } from 'app/main/region/region.service';
import { Draft, FlowFormData, FlowRecordContext } from '../flow.model';
import { FlowService } from '../flow.service';

@Component({
  selector: 'app-flow-registration',
  templateUrl: './flow-registration.component.html',
  styleUrls: ['./flow-registration.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FlowRegistrationComponent implements OnInit {
  @ViewChild('sdpFormModal')
  sdpFormModal: ElementRef;
  @ViewChild('draftPickerModal')
  draftPickerModal: ElementRef;
  modal: NgbModalRef;
  context: FlowRecordContext = {} as FlowRecordContext;
  countryOptions: Region[] = [];
  readonly steps: FlowRegistrationStep[] = ['guardian', 'child', 'travel', 'vaccine']
  readonly sexOptions = [
    {name: 'Male', id: Sex.Male},
    {name: 'Female', id: Sex.Female},
    {name: 'Other', id: Sex.Other},
  ]
  readonly modeOfTransportOptions = [
    {name: 'Walk', id: ModeOfTransport.Walk},
    {name: 'Bicycle', id: ModeOfTransport.Bicycle},
    {name: 'Motorcycle', id: ModeOfTransport.Motorcycle},
    {name: 'Car', id: ModeOfTransport.Car},
    {name: 'Airplane', id: ModeOfTransport.Airplane},
    {name: 'Other', id: ModeOfTransport.Other}
  ]
  readonly contentHeader: ContentHeader = {
      headerTitle: 'Flow Record',
      actionButton: true,
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Home',
            isLink: true,
            link: '/'
          },
          {
            name: 'Flow Registration',
            isLink: true,
            link: './'
          }
        ]
      },
      dropdownSettings: [{
        id: FlowRecordContextAction.SetSdp,
        icon: '',
        text: 'Set SDP',
        isLink: false,
        emit: true
      },
      {
        id: FlowRecordContextAction.OpenDraft,
        icon: '',
        text: 'Open Draft',
        isLink: false,
        emit: true
      },
      {
        id: FlowRecordContextAction.SaveAndCloseDraft,
        icon: '',
        text: 'Save & Close Draft',
        isLink: false,
        emit: true
      }]
    }
  step: FlowRegistrationStep = 'guardian';
  flowData: FlowFormData = {} as FlowFormData;
  sdpForm: FormGroup;
  sdpOptions: Region[] = [];
  drafts: Draft[] = [];
  constructor(_route: ActivatedRoute, private _router: Router, private _regionService: RegionService, private _formBuilder: UntypedFormBuilder, private _flowService: FlowService, private modalService: NgbModal, private appService: AppService) {
    _route.params.subscribe((params: Params) => {
      this.step = params.step;
    })
    this.sdpForm = this._formBuilder.group({
      sdpId: [0, Validators.required]
    })
  }
  async ngOnInit(): Promise<void> {
    await Promise.all([
      this.loadCountryOptions(),
      this.loadSdpOptions()
    ])
    await this.getSdpContext();
    this._flowService.draftLoadEvent(this.context.draftId);
  }
  get sdpFormData() {
    return this.sdpForm.controls;
  }
  get sdpContextName(): string {
    return this.sdpOptions.find(x => x.id === this.context.sdpId)?.name;
  }
  
  async loadSdpOptions(): Promise<void> {
    this.sdpOptions = await this.appService.getAssignedSdps().toPromise();
  }
  async loadCountryOptions(){
    const response:Region = await this._regionService.getRegionDetails(0, null).toPromise();
    this.countryOptions = response.subRegions;
  }
  async getSdpContext(): Promise<void> {
    const sdpIdStr = await this._flowService.getSelectedSdp().toPromise()
    this.context.sdpId = parseInt(sdpIdStr);
    if(!this.context.sdpId){
      this.openSdpForm();
    }
  }
  async setSdpContext(){
    if(!this.sdpForm.valid){
      return;
    }
    await this._flowService.setSelectedSdp(this.sdpForm.value.sdpId).toPromise();
    this.context.sdpId = this.sdpForm.value.sdpId;
    this.modal.close();
  }
  
  handleContextAction(ev: FlowRecordContextAction){
    switch(ev){
      case FlowRecordContextAction.SetSdp:
        this.openSdpForm();
        break;
      case FlowRecordContextAction.OpenDraft:
        this.openDraftPicker();
        break;
      case FlowRecordContextAction.SaveAndCloseDraft:
        this._flowService.saveAndClear();
        break;
    }
  }
  openSdpForm(){
    this.modal = this.modalService.open(this.sdpFormModal, {
      windowClass: 'modal'
    })
  }
  async openDraftPicker() {
    this.modal?.close();
    this.modal = this.modalService.open(this.draftPickerModal, {
      windowClass: 'modal',
      size: 'lg'
    })
    this.drafts = await this._flowService.getDraftList(this.context.sdpId).toPromise();
  }

  onOpenDraft(draftId: number){
    this.context.draftId = draftId;
    this._flowService.draftLoadEvent(draftId);
    this.modal.close();
  }
  
  next(){
    const nextStepIndex = this.steps.findIndex(x => x === this.step) + 1
    this.navigateToIndex(nextStepIndex);
  }
  previous(){
    const previousStepIndex = this.steps.findIndex(x => x === this.step) - 1
    this.navigateToIndex(previousStepIndex);
  }

  navigateToIndex(index: number) {
    this._router.navigate([`flow/registration/${this.steps[index]}`])
  }

  draftIdUpdated(draftId: number){
    this.context.draftId = draftId;
  }

}
