import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Subject } from 'rxjs';
import { ColumnMode, DatatableComponent, SelectionType } from '@swimlane/ngx-datatable';
import { DatatablesService } from '@core/services/datatable.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { SweetAlertModule } from 'shared/sweet-alert/sweet-alert.module';
import { VaccineManagementService } from 'shared/services/vaccine-management.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AppConstants } from 'shared/app.constant';
import Swal from 'sweetalert2';
import { FormOptions, Vaccine, VaccineManufacturer } from "app/main/immunizations/vaccine-management/vaccine-management.model";

@Component({
  selector: 'app-vaccine-list',
  templateUrl: './vaccine-list.component.html',
  styleUrls: ['./vaccine-list.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class VaccineListComponent implements OnInit {

  // Private
  private _unsubscribeAll: Subject<any>;
  private tempData = [];

  public isEdit:boolean = false;
  public VaccineCategory:Vaccine = null;
  // public
  public contentHeader: object;
  //public rows: any;
  public rows:Vaccine[] =[];
  public innerRows:VaccineManufacturer[]=[];
  public selected:boolean[] = [];
  //public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public ColumnMode = ColumnMode;
  public expanded = {};
  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};
  public chkBoxSelected = [];
  public SelectionType = SelectionType;
  public exportCSVData;
  public loading = false;
  public error = '';
  public pageNumber:number = 1;
  public pageSize:number = 10;
  

  @ViewChild(DatatableComponent) table: DatatableComponent;
  @ViewChild('tableRowDetails') tableRowDetails: any;

  formOptions: FormOptions = { unitOptions:[], predictedDateOptions:[] };
 
  // Public Methods
  // -----------------------------------------------------------------------------------------------------


  /**
   * Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {

    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {    
      return d.vaccineCategoryName.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.rows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }
   /**
   * Toggle the sidebar
   *
   * @param name
   */
  addtoggleSidebar(): void {    
    this.isEdit = false;
    this._coreSidebarService.getSidebarRegistry("new-vaccine-sidebar").toggleOpen();
  }
  edittoggleSidebar(row:Vaccine): void {    
    this.isEdit = true;
    this.VaccineCategory = row;
    this._coreSidebarService.getSidebarRegistry("new-vaccine-sidebar").toggleOpen();
  }

  /**
   * Row Details Toggle
   *
   * @param row
   */
  rowDetailsToggleExpand(row:Vaccine) {
    this.innerRows=row.vaccineManufacturerData;
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  /**
   * For ref only, log selected values
   *
   * @param selected
   */
  onSelect({ selected }) {
    console.log('Select Event', selected, this.selected);
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  async deleteVaccine(row:any){
    var parent = this;
    var result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#7367F0',
      cancelButtonColor: '#E42728',
      confirmButtonText: 'Yes, delete it!',
      customClass: {
        confirmButton: 'btn btn-primary',
        cancelButton: 'btn btn-danger ml-1'
      }
    });    
    if (result.value) {
      parent._vaccineManagementService.deleteVaccine({"vaccineCategoryId" : row.vaccineCategoryId} as Vaccine).subscribe(data => {
        Swal.fire({
          icon: 'success',
          title: 'Deleted!',
          text: 'Record deleted successfully.',
          customClass: {
            confirmButton: 'btn btn-success'
          }
        });  
        parent.getVaccineInventory();

      }),error => {
        if(error instanceof HttpErrorResponse && error.error){
          parent.error = error.error;
        }
        else{
          parent.error = AppConstants.genericError
        }
      };
    }
  }
  /**
   * Constructor
   *
   * @param {DatatablesService} _datatablesService
   * @param {CoreTranslationService} _coreTranslationService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(private _datatablesService: DatatablesService, 
    private _coreSidebarService: CoreSidebarService,
    private _vaccineManagementService:VaccineManagementService,
    private _alert: SweetAlertModule) {
    this._unsubscribeAll = new Subject();
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */

  async ngOnInit(): Promise<void> {
   
    this.getVaccineInventory();

    // content header
    this.contentHeader = {
      headerTitle: 'Vaccine Management',
      breadcrumb: {
        type: '',
        links: [
          {
            name: 'Immunizations',
            isLink: false,
            link: '/'
          },
          {
            name: 'Vaccine Management',
            isLink: false,
            link: '/'
          },
        ]
      }
    };

    this.formOptions = await this._vaccineManagementService.getFormOptions().toPromise();
  }

  predictedDateOptionById(predictedDateId: number): string {
    return this.formOptions.predictedDateOptions.find(x => x.predictedDateId == predictedDateId) // weak comparison because select binds with string
                                                ?.predictedDateName; 
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
  onVisibleChange(value:any){
    this.pageSize = value;
    this.getVaccineInventory();

  }
  setPage(event:any){
    this.pageNumber = event.offset;
    this.getVaccineInventory();
  }

  getVaccineInventory(){

    this.loading=true;
    this._vaccineManagementService.getVaccines(this.pageNumber,this.pageSize).subscribe(data => {
      this.rows = data;      
      this.tempData = data;
      this.exportCSVData = this.rows;
      this.loading = false;  
    }),error => {
      if(error instanceof HttpErrorResponse && error.error){
        this.error = error.error;
      }
      else{
        this.error = AppConstants.genericError
      }
      this.loading = false;
    };
  }
}

