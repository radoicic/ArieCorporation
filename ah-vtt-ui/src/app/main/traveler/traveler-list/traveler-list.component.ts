import { Component, OnInit, ViewChild, ViewEncapsulation, SimpleChanges, OnChanges } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { TravelerService } from '../traveler.service';
import { Traveler, TravelerListUI } from '../traveler.model';

@Component({
  selector: 'app-traveler-list',
  templateUrl: './traveler-list.component.html',
  styleUrls: ['./traveler-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TravelerListComponent implements OnInit, OnChanges {
  // Public
  public sidebarToggleRef = false;
  public rows = [];
  public selectedOption = 10;
  public ColumnMode = ColumnMode;
  public temp = [];
  public selectedId: number = -1;
  public page: number = 1;
  public searchValue = '';
  public toggle: boolean = false;
  public isSubmit: boolean;
  public tempData = [];
  // Decorator
  @ViewChild(DatatableComponent) table: DatatableComponent;

  // Private
  private _unsubscribeAll: Subject<void>;

  /**
   * Constructor
   *
   * @param {CoreConfigService} _coreConfigService
   * @param {TravelerService} _travelerService
   * @param {CoreSidebarService} _coreSidebarService
   */
  constructor(
    private _travelerService: TravelerService,
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService
  ) {
    this._unsubscribeAll = new Subject();
  }

  // Public Methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * filterUpdate
   *
   * @param event
   */
  filterUpdate(event) {
    // Reset ng-select on search

    const val = event.target.value.toLowerCase();

    // Filter Our Data
    const temp = this.rows.filter(function (d) {
      return d.name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // Update The Rows
    this.tempData = temp;
    // Whenever The Filter Changes, Always Go Back To The First Page
    this.table.offset = 0;
  }

  /**
   * Toggle the sidebar
   *
   * @param name
   */
  async toggleSidebar(name, id): Promise<void> {
    this.selectedId = id;
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  async deleteTraveler(id): Promise<void> {
    await this._travelerService.DeleteTraveler(id).toPromise()
    await this.loadTravelerLists();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this._coreSidebarService.getSidebarRegistry("new-traveler-sidebar").isOpened = changes.sidebar.currentValue;
    if( this._coreSidebarService.getSidebarRegistry("new-traveler-sidebar").isOpened == true)
    {
      await this.loadTravelerLists()
      this.toggle = false;
    }
  }

  /**
   * Filter Rows
   *
   * @param roleFilter
   * @param planFilter
   * @param statusFilter
   */
  filterRows(roleFilter, planFilter, statusFilter): TravelerListUI[] {
    // Reset search on select change
    this.searchValue = '';

    roleFilter = roleFilter.toLowerCase();
    planFilter = planFilter.toLowerCase();
    statusFilter = statusFilter.toLowerCase();

    return this.tempData.filter(row => {
      const isPartialNameMatch = row.role.toLowerCase().indexOf(roleFilter) !== -1 || !roleFilter;
      const isPartialGenderMatch = row.currentPlan.toLowerCase().indexOf(planFilter) !== -1 || !planFilter;
      const isPartialStatusMatch = row.status.toLowerCase().indexOf(statusFilter) !== -1 || !statusFilter;
      return isPartialNameMatch && isPartialGenderMatch && isPartialStatusMatch;
    });
  }

  // Lifecycle Hooks
  // -----------------------------------------------------------------------------------------------------
  /**
   * On init
   */
  async ngOnInit(): Promise<void> {
    await this.loadTravelerLists()
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  async loadTravelerLists(){
    const response: TravelerListUI[] = await this._travelerService.GetTravelerList(this.selectedOption, this.page).toPromise();
    this.rows = response;
    this.tempData = this.rows;
  }

  async onSubmit(isUpdate: boolean) {
    this.isSubmit = isUpdate;
    if(this.isSubmit) {
      const response: TravelerListUI[] = await this._travelerService.GetTravelerList(this.selectedOption, this.page).toPromise();
      this.rows = response;
      this.tempData = this.rows;
    }
  }
}
