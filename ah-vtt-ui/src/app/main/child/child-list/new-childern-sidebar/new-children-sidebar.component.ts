import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { FlowRecordContextAction, FlowRegistrationStep, ModeOfTransport, Sex } from '@core/types';
import { ChildService } from '../../child.service';
import { Child, IChangeEvent, GetChildUI, Country } from '../../child.model';

@Component({
  selector: 'app-new-children-sidebar',
  templateUrl: './new-children-sidebar.component.html'
})
export class NewChildSidebarComponent implements OnInit, OnChanges {
  @Input() childId: number = 0;
  @Output() newItemEvent = new EventEmitter<string>();
  

  public childInfo: GetChildUI;
  public countrylist: Country[];

  public id: number; 
  public firstname: string;
  public middlename?: string;
  public name;
  public lastname: string;
  public dob: string = new Date().toISOString().slice(0, 10);
  public sex: number;
  public address: string;
  public nationality: number;
  public avatar: string;

  sexOptions = [
    {name: 'Other', id: Sex.Other},
    {name: 'Male', id: Sex.Male},
    {name: 'Female', id: Sex.Female}
  ]

  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {ChildService _childService

   */
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _childService: ChildService,
  ) {}
  /**
   * Toggle the sidebar
   *
   * @param name
   */
  async toggleSidebar(name): Promise<void> {
    this._coreSidebarService.getSidebarRegistry(name).toggleOpen();
  }

  /**
   * Submit
   *
   * @param form
   */
  changeSelect(event: IChangeEvent) {
    this.sex = event.id
  }

  changeNationalitySelect(event: IChangeEvent) {
    this.nationality = event.id
  }

  async submit(form) {
    if (form.valid) {
      let child: Child;
      if(this.childId === 0) {
        child = {
          firstName: this.firstname,
          middleName: this.middlename,
          lastName: this.lastname,
          address: this.address,
          sex: this.sex,
          nationalityCountryId: this.nationality,
          dob: this.dob,
          avatar: this.avatar
        }
        await this._childService.AddChild(child).toPromise();
      }
      else {
        child = {
          childId: this.id,
          firstName: this.firstname,
          middleName: this.middlename,
          lastName: this.lastname,
          address: this.address,
          sex: this.sex,
          nationalityCountryId: this.nationality,
          dob: this.dob,
          avatar: this.avatar
        }
        var result: Child = await this._childService.UpdateChild(child).toPromise()
      }
      this.newItemEvent.emit(form.valid);
      this.toggleSidebar('new-children-sidebar');
    }
  }

  async ngOnInit(): Promise<void> {   
    this.countrylist = await this._childService.GetCountryList().toPromise();
  }

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.id = changes.childId.currentValue
    if(this.id > 0) {

      const response : GetChildUI = await this._childService.GetChildById(this.id).toPromise();

      this.childInfo = response;
      this.firstname = response.firstName;
      this.middlename = response.middleName;
      this.lastname = response.lastName;
      this.dob = response.dob;
      this.sex = response.sex
      this.address = response.address;
      this.nationality = response.nationality;
      this.avatar = response.avatar;
    }
  }
}
