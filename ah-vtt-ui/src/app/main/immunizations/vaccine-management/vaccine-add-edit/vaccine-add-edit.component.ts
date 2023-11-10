import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import Stepper from 'bs-stepper';
import { VaccineManagementService } from 'shared/services/vaccine-management.service';
import { NgbDate, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { SweetAlertModule } from 'shared/sweet-alert/sweet-alert.module';
import Swal from 'sweetalert2';
import { TemplateRef } from '@angular/core';
import { FormOptions, Vaccine, VaccineDose, VaccineManufacturer } from "app/main/immunizations/vaccine-management/vaccine-management.model";

@Component({
  selector: 'app-vaccine-add-edit',
  templateUrl: './vaccine-add-edit.component.html',
  styleUrls: ['./vaccine-add-edit.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VaccineAddEditComponent implements OnInit, OnChanges {
  @Input() isedit:boolean =  false;
  @Input() row:Vaccine = null;
  isAddModule:boolean = true;
  id: string;
  public rows:VaccineManufacturer[] = [];
  public doses: VaccineDose[] = [];
  public isadding:boolean = false;

  //#region Wizard start
   // public
   public contentHeader: object;
   public vaccineNameVar;
   public manufacturerForm: VaccineManufacturer = {} as VaccineManufacturer;
   public vaccineDoseForm: VaccineDose = {} as VaccineDose;

   public readonly selectDoseNumber=[
    { dose:'1'},
    { dose:'2'},
    { dose:'3'},
    { dose:'4'},
  
  ];
   public selectPredictedDate =[
    { name: 'At Birth' },
     { name: '1 mo' },
     { name: '2 mos' },
     { name: '4 mos' },
     { name: '6 mos' },
     { name: '9 mos' }
   ];
   @Input()
   formOptions: FormOptions = { unitOptions:[], predictedDateOptions:[] };
   @Output()
   reload: EventEmitter<void> = new EventEmitter<void>();
   // private
   private horizontalWizardStepper: Stepper;
   private bsStepper;
   

 
  //#endregion

  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _coreSidebarService: CoreSidebarService,
    private router: Router,
    private route: ActivatedRoute,
    private _vaccineManagementService:VaccineManagementService,
    private modalService: NgbModal,
    private _alert: SweetAlertModule
    ) {

    }
  ngOnChanges(changes: SimpleChanges): void {
    if(this.isedit){
      this.vaccineNameVar =  this.row.vaccineCategoryName;      
      this.rows = this.row.vaccineManufacturerData || [];
      this.doses = this.row.vaccineDoseData || [];
    }
    else{
      this.vaccineNameVar = "";
      this.rows = [];
    }
  }


  initManufacturerValues() {
    this.manufacturerForm = {
      vaccineManufacturerId: 0,
      manufacturerName : "",
      lot : "",
      quantity : 0,
      dose : 0,
      expiration : null,
      visedition : null,
      unitId: 0,
      comments : ""
    } as VaccineManufacturer
    
  }
  /**
   * Toggle the sidebar
   *
   * @param name
   */
 
  toggleSidebar(name:string): void {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

//#region Wizard start

  /**
   * Horizontal Wizard Stepper Next
   *
   * @param data
   */
  horizontalWizardStepperNext(data:any) {
    if (data == null || data.form.valid === true) {
      this.horizontalWizardStepper.next();
    }
  }
  horizontalWizardStepperSkipNext(form) {
    
      this.toggleSidebar('new-vaccine-sidebar');
      //logic for submit the data nd refresh the table

      //this.horizontalWizardStepper.next();
      //this.horizontalWizardStepper.reset();
      //form.reset();
  }
  /**
   * Horizontal Wizard Stepper Previous
   */
  horizontalWizardStepperPrevious() {
    this.horizontalWizardStepper.previous();
  }
//#endregion Wizard end
  edit(modalBasic:TemplateRef<any>, i:number){
    this.manufacturerForm.vaccineManufacturerId = this.rows[i].vaccineManufacturerId;
    this.manufacturerForm.manufacturerName = this.rows[i].manufacturerName;
    this.manufacturerForm.lot = this.rows[i].lot;
    this.manufacturerForm.quantity = this.rows[i].quantity;
    this.manufacturerForm.dose = this.rows[i].dose;
    this.manufacturerForm.expiration = this.rows[i].expiration;
    this.manufacturerForm.visedition =this.rows[i].visedition;
    this.manufacturerForm.comments = this.rows[i].comments;
 
    this.modalService.open(modalBasic);
  }
  editDose(modalBasic:TemplateRef<any>, i:number){
    this.vaccineDoseForm = Object.assign({}, this.doses[i]);
    this.modalService.open(modalBasic);
  }
  add(form:any){
    if (form.valid) {

      this.rows.push({
        "vaccineManufacturerId": 0,
        "comments": "",//this.comment,
        "manufacturerName": this.manufacturerForm.manufacturerName,
        "lot": this.manufacturerForm.lot,
        "quantity": this.manufacturerForm.quantity,
        "expiration": this.manufacturerForm.expiration,
        "visedition": this.manufacturerForm.visedition,
        "dose": this.manufacturerForm.dose,
        "unitId": this.manufacturerForm.unitId,
        "refillDose": 0
      });
      this.initManufacturerValues();
      this.isadding = false;
    }
    else{
      this.isadding = true;
    }
    
  }
  addDose(form:any){
    if (form.valid) {

      this.doses.push(Object.assign({}, this.vaccineDoseForm));
      this.initDoseValues();
      this.isadding = false;
    }
    else{
      this.isadding = true;
    }
  }
  accpet(i: number, modal:NgbModalRef){
    this.rows[i] = {
      "vaccineManufacturerId": this.manufacturerForm.vaccineManufacturerId,
      "comments": "",//this.comment,
      "manufacturerName": this.manufacturerForm.manufacturerName,
      "lot": this.manufacturerForm.lot,
      "quantity": this.manufacturerForm.quantity,
      "expiration": this.manufacturerForm.expiration,
      "visedition": this.manufacturerForm.visedition,
      "dose": this.manufacturerForm.dose,
      "unitId": this.manufacturerForm.unitId,
      "refillDose": 0
    }
    this.initManufacturerValues();
    modal.close('Accept click')
  }
  acceptDose(i: number, modal:NgbModalRef){
    this.doses[i] = Object.assign({}, this.vaccineDoseForm); 
    this.initDoseValues();
    modal.close('Accept click')
  }
  initDoseValues() {
    this.vaccineDoseForm = {} as VaccineDose;
  }
  modalOpen(modal:NgbModalRef) {
    this.modalService.open(modal, {
      windowClass: 'modal'
    });
  }

  deleteVaccineManufacturer(i:number){
    this.rows.splice(i, 1);
  }
  deleteVaccineDose(i:number){
    this.doses.splice(i, 1);
  }
  /**
   * Submit
   *
   * @param form
   */
  async submit() {
    try{
    const data = {
      "vaccineCategoryId": this.row?.vaccineCategoryId || 0,
      "vaccineCategoryName": this.vaccineNameVar,
      "vaccineManufacturerData": this.rows,
      "vaccineDoseData": this.doses
    } as Vaccine;
    this.vaccineNameVar = "";
    this.rows = [];
    if(this.isedit) {
      await this._vaccineManagementService.updateVaccine(data).toPromise()
    }
    else {
      await this._vaccineManagementService.addVaccine(data).toPromise()
    }
    
    this.toggleSidebar('new-vaccine-sidebar');
    this.horizontalWizardStepper.to(1);  
    }
    catch(err){
      console.error(err)
    }
    finally{
      this.reload.emit();
    }
    
  }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.isAddModule = !this.id;

    //#region  Wizard start
    this.horizontalWizardStepper = new Stepper(document.querySelector('#stepper1'), {});
    this.bsStepper = document.querySelectorAll('.bs-stepper');
    //#endregion Wizard end
  }

  predictedDateOptionById(predictedDateId: number): string {
    return this.formOptions.predictedDateOptions.find(x => x.predictedDateId == predictedDateId) // weak comparison because select binds with string
                                                ?.predictedDateName; 
  }
}
