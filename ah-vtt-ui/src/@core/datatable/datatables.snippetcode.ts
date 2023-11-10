import { snippetCode } from '@core/components/card-snippet/card-snippet.component';

export const snippetCodeKitchenSink: snippetCode = {
  html: `
<div class="row">
  <div class="col-12 mb-50">
    <button class="btn btn-primary ml-1" rippleEffect>
      <i data-feather="plus" class="mr-0 mr-sm-1"></i
      ><span class="d-none d-sm-inline-block">Add New Record</span>
    </button>

    <a csvLink [data]="exportCSVData" class="btn btn-outline-secondary float-right mr-1" rippleEffect
      >Export CSV</a
    >
  </div>
  <div class="col-md-6 col-12">
    <div class="d-flex justify-content-between align-items-center m-1">
      <label class="d-flex align-items-center"
        >Show
        <select class="form-control mx-25" [(ngModel)]="basicSelectedOption">
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
          <option value="100">100</option>
        </select>
        entries</label
      >
    </div>
  </div>
  <div class="col-md-6 col-12 d-flex justify-content-md-end">
    <div class="d-flex align-items-center justify-content-end pr-1 pb-1 pl-1 pl-md-0 pb-md-0">
      <label class="d-flex align-items-center"
        >Search<input
          type="search"
          placeholder="Search"
          class="form-control ml-25"
          (keyup)="filterUpdate($event)"
          (search)="filterUpdate($event)"
      /></label>
    </div>
  </div>
</div>
<ngx-datatable
  [rows]="kitchenSinkRows"
  [rowHeight]="58"
  class="bootstrap core-bootstrap"
  [limit]="10"
  [columnMode]="ColumnMode.force"
  [headerHeight]="40"
  [footerHeight]="50"
  [scrollbarH]="true"
  [selectionType]="SelectionType.checkbox"
  [limit]="basicSelectedOption"
  (activate)="onActivate($event)"
  (select)="onSelect($event)"
>
  <ngx-datatable-column
    [width]="50"
    [sortable]="false"
    [canAutoResize]="false"
    [draggable]="false"
    [resizeable]="false"
  >
    <ng-template
      ngx-datatable-header-template
      let-value="value"
      let-allRowsSelected="allRowsSelected"
      let-selectFn="selectFn"
    >
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          [checked]="allRowsSelected"
          (change)="selectFn(!allRowsSelected)"
          id="headerChkbxRef"
        />
        <label class="custom-control-label" for="headerChkbxRef"></label>
      </div>
    </ng-template>
    <ng-template
      ngx-datatable-cell-template
      let-rowIndex="rowIndex"
      let-value="value"
      let-isSelected="isSelected"
      let-onCheckboxChangeFn="onCheckboxChangeFn"
    >
      <div class="custom-control custom-checkbox">
        <input
          type="checkbox"
          class="custom-control-input"
          [checked]="isSelected"
          (change)="onCheckboxChangeFn($event)"
          id="rowChkbxRef{{ rowIndex }}"
        />
        <label class="custom-control-label" for="rowChkbxRef{{ rowIndex }}"></label>
      </div>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column name="Name" prop="full_name" [width]="280">
    <ng-template let-row="row" let-name="value" ngx-datatable-cell-template>
      <div class="d-flex align-items-center">
        <div *ngIf="row.avatar.length > 0; else customAvatar">
          <img
            class="rounded-circle mr-1"
            src="assets/images/portrait/small/{{ row.avatar }}"
            height="32"
            width="32"
            alt="datatable-avatar"
          />
        </div>
        <ng-template #customAvatar>
          <div
            class="avatar mr-1 ml-0"
            [ngClass]="{
              'bg-light-primary': row.status == '1',
              'bg-light-success': row.status == '2',
              'bg-light-danger': row.status == '3',
              'bg-light-warning': row.status == '4',
              'bg-light-info': row.status == '5'
            }"
          >
            <div class="avatar-content">{{ name | initials }}</div>
          </div>
        </ng-template>
        <div class="cell-line-height">
          <p class="font-medium-1 font-weight-bold line-height-1 mb-25">
            {{ name }}
          </p>
          <span class="text-muted font-small-2"> {{ row.post }}</span>
        </div>
      </div>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column name="Email" prop="email" [width]="250"></ngx-datatable-column>
  <ngx-datatable-column name="Date" prop="start_date" [width]="120"></ngx-datatable-column>
  <ngx-datatable-column name="Salary" prop="salary" [width]="120"></ngx-datatable-column>
  <ngx-datatable-column name="Status" prop="status" [width]="120">
    <ng-template let-status="value" ngx-datatable-cell-template>
      <div
        class="badge badge-pill"
        [ngClass]="{
          'badge-light-primary': status == '1',
          'badge-light-success': status == '2',
          'badge-light-danger': status == '3',
          'badge-light-warning': status == '4',
          'badge-light-info': status == '5'
        }"
      >
        {{
          status == 1
            ? 'Current'
            : status == 2
            ? 'Professional'
            : status == 3
            ? 'Rejected'
            : status == 4
            ? 'Resigned'
            : status == 5
            ? 'Applied'
            : 'Applied'
        }}
      </div>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column name="Actions" [width]="120" [sortable]="false">
    <ng-template ngx-datatable-cell-template>
      <div class="d-flex align-items-center">
        <div ngbDropdown container="body">
          <a
            ngbDropdownToggle
            href="javascript:void(0);"
            class="hide-arrow"
            id="dropdownBrowserState"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i data-feather="more-vertical" class="text-primary cursor-pointer mr-50"></i>
          </a>
          <div ngbDropdownMenu class="dropdown-menu-right" aria-labelledby="dropdownBrowserState">
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="file-text" class="mr-50"></i> Details</a
            >
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="archive" class="mr-50"></i> Archive</a
            >
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="trash-2" class="mr-50"></i> Delete</a
            >
          </div>
        </div>

        <i data-feather="edit" class="text-primary cursor-pointer"></i>
      </div>
    </ng-template>
  </ngx-datatable-column>
</ngx-datatable>
  `,
  ts: `
  public kitchenSinkRows: any;
  public basicSelectedOption: number = 10;
  public SelectionType = SelectionType;

  /**
   * Method Search (filter)
   *
   * @param event
   */
  filterUpdate(event) {
    const val = event.target.value.toLowerCase();

    // filter our data
    const temp = this.tempData.filter(function (d) {
      return d.full_name.toLowerCase().indexOf(val) !== -1 || !val;
    });

    // update the rows
    this.kitchenSinkRows = temp;
    // Whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.kitchenSinkRows = this.rows;
      this.exportCSVData = this.rows;
    });
  }
  `
};

export const snippetCodeInlineEditing: snippetCode = {
  html: `
<ngx-datatable
  class="bootstrap core-bootstrap"
  [headerHeight]="40"
  [rowHeight]="58"
  [limit]="10"
  [columnMode]="ColumnMode.force"
  [footerHeight]="50"
  [rows]="rows"
  [scrollbarH]="true"
>
  <ngx-datatable-column [width]="280" name="Name" prop="full_name">
    <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-value="value" let-row="row">
      <div
        title="Double click to edit"
        (dblclick)="editingName[rowIndex + '-full_name'] = true"
        *ngIf="!editingName[rowIndex + '-full_name']"
      >
        <div class="d-flex align-items-center">
          <div *ngIf="row.avatar.length > 0; else customAvatar">
            <img
              class="rounded-circle mr-1"
              src="assets/images/portrait/small/{{ row.avatar }}"
              height="32"
              width="32"
              alt="datatable-avatar"
            />
          </div>
          <ng-template #customAvatar>
            <div
              class="avatar mr-1 ml-0"
              [ngClass]="{
                'bg-light-primary': row.status == '1',
                'bg-light-success': row.status == '2',
                'bg-light-danger': row.status == '3',
                'bg-light-warning': row.status == '4',
                'bg-light-info': row.status == '5'
              }"
            >
              <div class="avatar-content">{{ value | initials }}</div>
            </div>
          </ng-template>
          <div class="cell-line-height">
            <p class="font-medium-1 line-height-1 mb-0">{{ value }}</p>
            <span class="text-muted font-small-2"> {{ row.post }}</span>
          </div>
        </div>
      </div>
      <input
        autofocus
        class="form-control form-control-sm"
        (blur)="inlineEditingUpdateName($event, 'full_name', rowIndex)"
        *ngIf="editingName[rowIndex + '-full_name']"
        type="text"
        [value]="value"
      />
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column [width]="120" name="Status" prop="status">
    <ng-template ngx-datatable-cell-template let-rowIndex="rowIndex" let-row="row" let-value="value">
      <div
        title="Double click to edit"
        (dblclick)="editingStatus[rowIndex + '-status'] = true"
        *ngIf="!editingStatus[rowIndex + '-status']"
      >
        <div
          class="badge badge-pill"
          [ngClass]="{
            'badge-light-primary': value == '1',
            'badge-light-success': value == '2',
            'badge-light-danger': value == '3',
            'badge-light-warning': value == '4',
            'badge-light-info': value == '5'
          }"
        >
          {{
            value == 1
              ? 'Current'
              : value == 2
              ? 'Professional'
              : value == 3
              ? 'Rejected'
              : value == 4
              ? 'Resigned'
              : value == 5
              ? 'Applied'
              : 'Applied'
          }}
        </div>
      </div>
      <select
        *ngIf="editingStatus[rowIndex + '-status']"
        (blur)="editingStatus[rowIndex + '-status'] = false"
        (change)="inlineEditingUpdateStatus($event, 'status', rowIndex)"
        [value]="value"
        class="form-control form-control-sm"
      >
        <option value="1">Current</option>
        <option value="2">Professional</option>
        <option value="3">Rejected</option>
        <option value="4">Resigned</option>
        <option value="5">Applied</option>
      </select>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column [width]="50" name="Age" prop="age">
    <ng-template ngx-datatable-cell-template let-value="value" let-rowIndex="rowIndex" let-row="row">
      <div
        title="Double click to edit"
        (dblclick)="editingAge[rowIndex + '-age'] = true"
        *ngIf="!editingAge[rowIndex + '-age']"
      >
        {{ value }}
      </div>
      <input
        autofocus
        class="form-control form-control-sm"
        (blur)="inlineEditingUpdateAge($event, 'age', rowIndex)"
        *ngIf="editingAge[rowIndex + '-age']"
        type="text"
        [value]="value"
      />
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column [width]="100" name="Salary" prop="salary" [width]="120">
    <ng-template ngx-datatable-cell-template let-value="value" let-rowIndex="rowIndex" let-row="row">
      <div
        title="Double click to edit"
        (dblclick)="editingSalary[rowIndex + '-salary'] = true"
        *ngIf="!editingSalary[rowIndex + '-salary']"
      >
        {{ value }}
      </div>
      <input
        autofocus
        class="form-control form-control-sm"
        (blur)="inlineEditingUpdateSalary($event, 'salary', rowIndex)"
        *ngIf="editingSalary[rowIndex + '-salary']"
        type="text"
        [value]="value"
      />
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column name="Actions" [width]="120" [sortable]="false">
    <ng-template ngx-datatable-cell-template>
      <div class="d-flex align-items-center">
        <div ngbDropdown container="body">
          <a
            ngbDropdownToggle
            href="javascript:void(0);"
            class="hide-arrow"
            id="dropdownBrowserState"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i data-feather="more-vertical" class="text-primary cursor-pointer mr-50"></i>
          </a>
          <div ngbDropdownMenu class="dropdown-menu-right" aria-labelledby="dropdownBrowserState">
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="file-text" class="mr-50"></i> Details</a
            >
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="archive" class="mr-50"></i> Archive</a
            >
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="trash-2" class="mr-50"></i> Delete</a
            >
          </div>
        </div>

        <i data-feather="edit" class="text-primary cursor-pointer"></i>
      </div>
    </ng-template>
  </ngx-datatable-column>
</ngx-datatable>
  `,
  ts: `

  public editingName = {};
  public editingStatus = {};
  public editingAge = {};
  public editingSalary = {};

  /**
   * Inline editing Name
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateName(event, cell, rowIndex) {
    this.editingName[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Age
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateAge(event, cell, rowIndex) {
    this.editingAge[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Salary
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateSalary(event, cell, rowIndex) {
    this.editingSalary[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * Inline editing Status
   *
   * @param event
   * @param cell
   * @param rowIndex
   */
  inlineEditingUpdateStatus(event, cell, rowIndex) {
    this.editingStatus[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
  }

  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
    });
  }
  `
};

export const snippetCodeRowDetails: snippetCode = {
  html: `
  <!-- ngx-datatable-row-details -->
  <ngx-datatable
    #tableRowDetails
    class="bootstrap core-bootstrap"
    [columnMode]="ColumnMode.force"
    [headerHeight]="40"
    [footerHeight]="50"
    [rowHeight]="58"
    [limit]="10"
    [rows]="rows"
    [scrollbarH]="true"
  >
    <!-- Row Detail Template -->
    <ngx-datatable-row-detail [rowHeight]="50">
      <ng-template let-row="row" let-expanded="expanded" ngx-datatable-row-detail-template>
        <div class="ml-75 pl-5 pt-75">
          <div>
            <span><strong>City : </strong> {{ row.city }}</span
            ><span class="ml-1"><strong>Experience : </strong> {{ row.experience }}</span
            ><span class="ml-1"><strong>Start Date : </strong> {{ row.start_date }}</span>
          </div>
        </div>
      </ng-template>
    </ngx-datatable-row-detail>
    <ngx-datatable-column
      [width]="50"
      [resizeable]="false"
      [sortable]="false"
      [draggable]="false"
      [canAutoResize]="false"
    >
      <ng-template let-row="row" let-expanded="expanded" ngx-datatable-cell-template>
        <a
          href="javascript:void(0)"
          [class.datatable-icon-right]="!expanded"
          [class.datatable-icon-down]="expanded"
          title="Expand/Collapse Row"
          (click)="rowDetailsToggleExpand(row)"
        >
        </a>
      </ng-template>
    </ngx-datatable-column>
    <ngx-datatable-column name="Name" prop="full_name" [width]="280">
      <ng-template let-row="row" let-name="value" ngx-datatable-cell-template>
        <div class="d-flex align-items-center">
          <div *ngIf="row.avatar.length > 0; else customAvatar">
            <img
              class="rounded-circle mr-1"
              src="assets/images/portrait/small/{{ row.avatar }}"
              height="32"
              width="32"
              alt="datatable-avatar"
            />
          </div>
          <ng-template #customAvatar>
            <div
              class="avatar mr-1 ml-0"
              [ngClass]="{
                'bg-light-primary': row.status == '1',
                'bg-light-success': row.status == '2',
                'bg-light-danger': row.status == '3',
                'bg-light-warning': row.status == '4',
                'bg-light-info': row.status == '5'
              }"
            >
              <div class="avatar-content">{{ name | initials }}</div>
            </div>
          </ng-template>
          <div class="cell-line-height">
            <p class="font-medium-1 line-height-1 mb-0">{{ name }}</p>
            <span class="text-muted font-small-2"> {{ row.post }}</span>
          </div>
        </div>
      </ng-template>
    </ngx-datatable-column>
    <ngx-datatable-column name="Email" prop="email" [width]="250"></ngx-datatable-column>
    <ngx-datatable-column name="Age" prop="age" [width]="50"></ngx-datatable-column>
    <ngx-datatable-column name="Salary" prop="salary" [width]="120"></ngx-datatable-column>
    <ngx-datatable-column name="Status" prop="status" [width]="120">
      <ng-template let-status="value" ngx-datatable-cell-template>
        <div
          class="badge badge-pill"
          [ngClass]="{
            'badge-light-primary': status == '1',
            'badge-light-success': status == '2',
            'badge-light-danger': status == '3',
            'badge-light-warning': status == '4',
            'badge-light-info': status == '5'
          }"
        >
          {{
            status == 1
              ? 'Current'
              : status == 2
              ? 'Professional'
              : status == 3
              ? 'Rejected'
              : status == 4
              ? 'Resigned'
              : status == 5
              ? 'Applied'
              : 'Applied'
          }}
        </div>
      </ng-template>
    </ngx-datatable-column>
    <ngx-datatable-column name="Actions" [width]="120" [sortable]="false">
      <ng-template ngx-datatable-cell-template>
        <div class="d-flex align-items-center">
          <div ngbDropdown container="body">
            <a
              ngbDropdownToggle
              href="javascript:void(0);"
              class="hide-arrow"
              id="dropdownBrowserState"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i data-feather="more-vertical" class="text-primary cursor-pointer mr-50"></i>
            </a>
            <div ngbDropdownMenu class="dropdown-menu-right" aria-labelledby="dropdownBrowserState">
              <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                ><i data-feather="file-text" class="mr-50"></i> Details</a
              >
              <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                ><i data-feather="archive" class="mr-50"></i> Archive</a
              >
              <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                ><i data-feather="trash-2" class="mr-50"></i> Delete</a
              >
            </div>
          </div>

          <i data-feather="edit" class="text-primary cursor-pointer"></i>
        </div>
      </ng-template>
    </ngx-datatable-column>
  </ngx-datatable>
  <!-- ngx-datatable-row-details -->
  `,
  ts: `

  @ViewChild('tableRowDetails') tableRowDetails: any;

  public ColumnMode = ColumnMode;

  /**
   * rowDetailsToggleExpand
   *
   * @param row
   */
  rowDetailsToggleExpand(row) {
    this.tableRowDetails.rowDetail.toggleExpandRow(row);
  }

  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
    });
  }
  `
};

export const snippetCodeCustomCheckbox: snippetCode = {
  html: `
<!-- ngx-datatable-custom-checkbox -->
  <div class="row">
    <div class="col-12">
      <ngx-datatable
        class="bootstrap core-bootstrap"
        [rows]="rows"
        [columnMode]="ColumnMode.force"
        [headerHeight]="40"
        [footerHeight]="50"
        [rowHeight]="58"
        [limit]="10"
        [selected]="chkBoxSelected"
        [selectionType]="SelectionType.checkbox"
        (select)="customChkboxOnSelect($event)"
        [scrollbarH]="true"
        (activate)="onActivate($event)"
        (select)="onSelect($event)"
      >
        <ngx-datatable-column
          [width]="50"
          [sortable]="false"
          [canAutoResize]="false"
          [draggable]="false"
          [resizeable]="false"
        >
          <ng-template
            ngx-datatable-header-template
            let-value="value"
            let-allRowsSelected="allRowsSelected"
            let-selectFn="selectFn"
          >
            <div class="custom-control custom-control-primary custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                [checked]="allRowsSelected"
                (change)="selectFn(!allRowsSelected)"
                id="headerCustomChkbxRef"
              />
              <label class="custom-control-label" for="headerCustomChkbxRef"></label>
            </div>
          </ng-template>
          <ng-template
            ngx-datatable-cell-template
            let-rowIndex="rowIndex"
            let-value="value"
            let-isSelected="isSelected"
            let-onCheckboxChangeFn="onCheckboxChangeFn"
          >
            <div class="custom-control custom-control-primary custom-checkbox">
              <input
                type="checkbox"
                class="custom-control-input"
                [checked]="isSelected"
                (change)="onCheckboxChangeFn($event)"
                id="rowCustomChkbxRef{{ rowIndex }}"
              />
              <label class="custom-control-label" for="rowCustomChkbxRef{{ rowIndex }}"></label>
            </div>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Name" prop="full_name" [width]="280">
          <ng-template let-row="row" let-name="value" ngx-datatable-cell-template>
            <div class="d-flex align-items-center">
              <div *ngIf="row.avatar.length > 0; else customAvatar">
                <img
                  class="rounded-circle mr-1"
                  src="assets/images/portrait/small/{{ row.avatar }}"
                  height="32"
                  width="32"
                  alt="datatable-avatar"
                />
              </div>
              <ng-template #customAvatar>
                <div
                  class="avatar mr-1 ml-0"
                  [ngClass]="{
                    'bg-light-primary': row.status == '1',
                    'bg-light-success': row.status == '2',
                    'bg-light-danger': row.status == '3',
                    'bg-light-warning': row.status == '4',
                    'bg-light-info': row.status == '5'
                  }"
                >
                  <div class="avatar-content">{{ name | initials }}</div>
                </div>
              </ng-template>
              <div class="cell-line-height">
                <p class="font-medium-1 line-height-1 mb-0">{{ name }}</p>
                <span class="text-muted font-small-2"> {{ row.post }}</span>
              </div>
            </div>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Email" prop="email" [width]="250"></ngx-datatable-column>
        <ngx-datatable-column name="Age" prop="age" [width]="50"></ngx-datatable-column>
        <ngx-datatable-column name="Salary" prop="salary" [width]="120"></ngx-datatable-column>
        <ngx-datatable-column name="Status" prop="status" [width]="120">
          <ng-template let-status="value" ngx-datatable-cell-template>
            <div
              class="badge badge-pill"
              [ngClass]="{
                'badge-light-primary': status == '1',
                'badge-light-success': status == '2',
                'badge-light-danger': status == '3',
                'badge-light-warning': status == '4',
                'badge-light-info': status == '5'
              }"
            >
              {{
                status == 1
                  ? 'Current'
                  : status == 2
                  ? 'Professional'
                  : status == 3
                  ? 'Rejected'
                  : status == 4
                  ? 'Resigned'
                  : status == 5
                  ? 'Applied'
                  : 'Applied'
              }}
            </div>
          </ng-template>
        </ngx-datatable-column>
        <ngx-datatable-column name="Actions" [width]="120" [sortable]="false">
          <ng-template ngx-datatable-cell-template>
            <div class="d-flex align-items-center">
              <div ngbDropdown container="body">
                <a
                  ngbDropdownToggle
                  href="javascript:void(0);"
                  class="hide-arrow"
                  id="dropdownBrowserState"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i data-feather="more-vertical" class="text-primary cursor-pointer mr-50"></i>
                </a>
                <div ngbDropdownMenu class="dropdown-menu-right" aria-labelledby="dropdownBrowserState">
                  <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                    ><i data-feather="file-text" class="mr-50"></i> Details</a
                  >
                  <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                    ><i data-feather="archive" class="mr-50"></i> Archive</a
                  >
                  <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                    ><i data-feather="trash-2" class="mr-50"></i> Delete</a
                  >
                </div>
              </div>

              <i data-feather="edit" class="text-primary cursor-pointer"></i>
            </div>
          </ng-template>
        </ngx-datatable-column>
      </ngx-datatable>
    </div>
    <div class="selected-column col-12 mt-1">
      <hr class="w-100" />
      <h5 class="mx-1">
        Selections <small>({{ chkBoxSelected?.length }})</small>
      </h5>
      <ul>
        <li *ngFor="let sel of chkBoxSelected">
          {{ sel.full_name }}
        </li>
        <li *ngIf="!chkBoxSelected?.length">No Selections</li>
      </ul>
    </div>
  </div>
  <!--/ ngx-datatable-custom-checkbox -->
  `,
  ts: `

  @ViewChild('tableRowDetails') tableRowDetails: any;

  public ColumnMode = ColumnMode;

  public chkBoxSelected = [];

  /**
   * customChkboxOnSelect
   *
   * @param { selected }
   */
  customChkboxOnSelect({ selected }) {
    this.chkBoxSelected.splice(0, this.chkBoxSelected.length);
    this.chkBoxSelected.push(...selected);
  }

  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
    });
  }

  `
};

export const snippetCodeResponsive: snippetCode = {
  html: `
  <!-- ngx-datatables responsive -->
  <ngx-datatable
    #table
    class="bootstrap core-bootstrap"
    [columnMode]="ColumnMode.force"
    [headerHeight]="40"
    [rowHeight]="58"
    [footerHeight]="50"
    rowHeight="auto"
    [limit]="10"
    [rows]="rows"
    [scrollbarH]="true"
  >
    <ngx-datatable-column name="Name" prop="full_name" [width]="280">
      <ng-template let-row="row" let-name="value" ngx-datatable-cell-template>
        <div class="d-flex align-items-center">
          <div *ngIf="row.avatar.length > 0; else customAvatar">
            <img
              class="rounded-circle mr-1"
              src="assets/images/portrait/small/{{ row.avatar }}"
              height="32"
              width="32"
              alt="datatable-avatar"
            />
          </div>
          <ng-template #customAvatar>
            <div
              class="avatar mr-1 ml-0"
              [ngClass]="{
                'bg-light-primary': row.status == '1',
                'bg-light-success': row.status == '2',
                'bg-light-danger': row.status == '3',
                'bg-light-warning': row.status == '4',
                'bg-light-info': row.status == '5'
              }"
            >
              <div class="avatar-content">{{ name | initials }}</div>
            </div>
          </ng-template>
          <div class="cell-line-height">
            <p class="font-medium-1 line-height-1 mb-0">{{ name }}</p>
            <span class="text-muted font-small-2"> {{ row.post }}</span>
          </div>
        </div>
      </ng-template>
    </ngx-datatable-column>
    <ngx-datatable-column name="Email" prop="email" [width]="250"></ngx-datatable-column>
    <ngx-datatable-column name="Age" prop="age" [width]="50"></ngx-datatable-column>
    <ngx-datatable-column name="Status" prop="status" [width]="120">
      <ng-template let-status="value" ngx-datatable-cell-template>
        <div
          class="badge badge-pill"
          [ngClass]="{
            'badge-light-primary': status == '1',
            'badge-light-success': status == '2',
            'badge-light-danger': status == '3',
            'badge-light-warning': status == '4',
            'badge-light-info': status == '5'
          }"
        >
          {{
            status == 1
              ? 'Current'
              : status == 2
              ? 'Professional'
              : status == 3
              ? 'Rejected'
              : status == 4
              ? 'Resigned'
              : status == 5
              ? 'Applied'
              : 'Applied'
          }}
        </div>
      </ng-template>
    </ngx-datatable-column>
    <ngx-datatable-column name="Action" [width]="120" [sortable]="false">
      <ng-template ngx-datatable-cell-template>
        <div class="d-flex align-items-center">
          <div ngbDropdown container="body">
            <a
              ngbDropdownToggle
              href="javascript:void(0);"
              class="hide-arrow"
              id="dropdownBrowserState"
              data-toggle="dropdown"
              aria-haspopup="true"
              aria-expanded="false"
            >
              <i data-feather="more-vertical" class="text-primary cursor-pointer mr-50"></i>
            </a>
            <div ngbDropdownMenu class="dropdown-menu-right" aria-labelledby="dropdownBrowserState">
              <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                ><i data-feather="file-text" class="mr-50"></i> Details</a
              >
              <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                ><i data-feather="archive" class="mr-50"></i> Archive</a
              >
              <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
                ><i data-feather="trash-2" class="mr-50"></i> Delete</a
              >
            </div>
          </div>

          <i data-feather="edit" class="text-primary cursor-pointer"></i>
        </div>
      </ng-template>
    </ngx-datatable-column>
  </ngx-datatable>
  <!--/ ngx-datatables responsive -->
  `,
  ts: `
  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
    });
  }
  `
};

export const snippetCodeMultilangual: snippetCode = {
  html: `
  <ngx-datatable
  #table
  class="bootstrap core-bootstrap"
  [columnMode]="ColumnMode.force"
  [headerHeight]="40"
  [rowHeight]="58"
  [footerHeight]="50"
  rowHeight="auto"
  [limit]="10"
  [rows]="rows"
  [scrollbarH]="true"
>
  <ngx-datatable-column name="{{ 'HEADER.NAME' | translate }}" prop="full_name" [width]="280">
    <ng-template let-row="row" let-name="value" ngx-datatable-cell-template>
      <div class="d-flex align-items-center">
        <div *ngIf="row.avatar.length > 0; else customAvatar">
          <img
            class="rounded-circle mr-1"
            src="assets/images/portrait/small/{{ row.avatar }}"
            height="32"
            width="32"
            alt="datatable-avatar"
          />
        </div>
        <ng-template #customAvatar>
          <div
            class="avatar mr-1 ml-0"
            [ngClass]="{
              'bg-light-primary': row.status == '1',
              'bg-light-success': row.status == '2',
              'bg-light-danger': row.status == '3',
              'bg-light-warning': row.status == '4',
              'bg-light-info': row.status == '5'
            }"
          >
            <div class="avatar-content">{{ name | initials }}</div>
          </div>
        </ng-template>
        <div class="cell-line-height">
          <p class="font-medium-1 line-height-1 mb-0">{{ name }}</p>
          <span class="text-muted font-small-2"> {{ row.post }}</span>
        </div>
      </div>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column
    name="{{ 'HEADER.EMAIL' | translate }}"
    prop="email"
    [width]="250"
  ></ngx-datatable-column>
  <ngx-datatable-column name="{{ 'HEADER.AGE' | translate }}" prop="age" [width]="50"></ngx-datatable-column>
  <ngx-datatable-column name="{{ 'HEADER.STATUS' | translate }}" prop="status" [width]="120">
    <ng-template let-status="value" ngx-datatable-cell-template>
      <div
        class="badge badge-pill"
        [ngClass]="{
          'badge-light-primary': status == '1',
          'badge-light-success': status == '2',
          'badge-light-danger': status == '3',
          'badge-light-warning': status == '4',
          'badge-light-info': status == '5'
        }"
      >
        {{
          status == 1
            ? 'Current'
            : status == 2
            ? 'Professional'
            : status == 3
            ? 'Rejected'
            : status == 4
            ? 'Resigned'
            : status == 5
            ? 'Applied'
            : 'Applied'
        }}
      </div>
    </ng-template>
  </ngx-datatable-column>
  <ngx-datatable-column name="{{ 'HEADER.ACTIONS' | translate }}" [width]="120" [sortable]="false">
    <ng-template ngx-datatable-cell-template>
      <div class="d-flex align-items-center">
        <div ngbDropdown container="body">
          <a
            ngbDropdownToggle
            href="javascript:void(0);"
            class="hide-arrow"
            id="dropdownBrowserState"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <i data-feather="more-vertical" class="text-primary cursor-pointer mr-50"></i>
          </a>
          <div ngbDropdownMenu class="dropdown-menu-right" aria-labelledby="dropdownBrowserState">
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="file-text" class="mr-50"></i> Details</a
            >
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="archive" class="mr-50"></i> Archive</a
            >
            <a href="javascript:void(0)" ngbDropdownItem class="d-flex align-items-center"
              ><i data-feather="trash-2" class="mr-50"></i> Delete</a
            >
          </div>
        </div>

        <i data-feather="edit" class="text-primary cursor-pointer"></i>
      </div>
    </ng-template>
  </ngx-datatable-column>
</ngx-datatable>
  `,
  ts: `
  constructor( private _coreTranslationService: CoreTranslationService) {
    this._coreTranslationService.translate(english, french, german, portuguese);
  }

  /**
   * On init
   */
  ngOnInit() {
    this._datatablesService.onDatatablessChanged.pipe(takeUntil(this._unsubscribeAll)).subscribe(response => {
      this.rows = response;
      this.tempData = this.rows;
    });
  }
  `
};
