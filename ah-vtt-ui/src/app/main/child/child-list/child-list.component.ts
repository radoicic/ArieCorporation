import { Component, OnInit, ViewChild, ViewEncapsulation, SimpleChanges, OnChanges } from '@angular/core';
import { ColumnMode, DatatableComponent } from '@swimlane/ngx-datatable';

import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { CoreConfigService } from '@core/services/config.service';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';

import { ChildService } from '../child.service';
import { RegionService } from 'app/main/region/region.service';
import { ILookupRegion } from 'app/main/region/region.model';
import { Child, ChildListUI } from '../child.model';

@Component({
  selector: 'app-child-list',
  templateUrl: './child-list.component.html',
  styleUrls: ['./child-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ChildListComponent implements OnInit, OnChanges {
  // Public
  public lookupRegions: {lookupRegions: ILookupRegion[]} = {lookupRegions: null}; 
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
   * @param {ChildService} _childService
   * @param {CoreSidebarService} _coreSidebarService
   * @param {RegionService} _regionService
   */
  constructor(
    private _childService: ChildService,
    private _coreSidebarService: CoreSidebarService,
    private _coreConfigService: CoreConfigService,
    private _regionService: RegionService,

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

  async deleteChild(id): Promise<void> {
    await this._childService.DeleteChild(id).toPromise();
    await this.loadChildLists();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this._coreSidebarService.getSidebarRegistry("new-children-sidebar").isOpened = changes.sidebar.currentValue;
    if( this._coreSidebarService.getSidebarRegistry("new-children-sidebar").isOpened == true)
    {
      await this.loadChildLists()
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
  filterRows(roleFilter, planFilter, statusFilter): ChildListUI[] {
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
    await this.loadChildLists();
    this.lookupRegions = await this._regionService.GetLookupRegions().toPromise();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  async loadChildLists(){
    const response: ChildListUI[] = await this._childService.GetChildList(this.selectedOption, this.page).toPromise();
    this.rows = response;
    this.tempData = this.rows;
  }

  async onSubmit(isUpdate: boolean) {
    this.isSubmit = isUpdate;
    if(this.isSubmit) {
      const response: ChildListUI[] = await this._childService.GetChildList(this.selectedOption, this.page).toPromise();
      this.rows = response;
      this.tempData = this.rows;
    }
  }
}
