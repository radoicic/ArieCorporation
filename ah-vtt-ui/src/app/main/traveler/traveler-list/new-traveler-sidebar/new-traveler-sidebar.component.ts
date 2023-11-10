import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { CoreSidebarService } from '@core/components/core-sidebar/core-sidebar.service';
import { FlowRecordContextAction, FlowRegistrationStep, ModeOfTransport, Sex } from '@core/types';
import { TravelerService } from '../../traveler.service';
import { Traveler, IChangeEvent, GetTravelerUI, Country } from '../../traveler.model';

@Component({
  selector: 'app-new-traveler-sidebar',
  templateUrl: './new-traveler-sidebar.component.html'
})
export class NewTravelerSidebarComponent implements OnInit, OnChanges {
  @Input() travelerId: number = 0;
  @Output() newItemEvent = new EventEmitter<string>();
  

  public travelerInfo: GetTravelerUI;

  public id: number; 
  public firstname: string;
  public middlename?: string;
  public name;
  public lastname: string;
  public dob: string = new Date().toISOString().slice(0, 10);
  public sex: number;
  public address: string;
  public nationality: number;
  public phone?: string;
  public email: string;
  public countrylist: Country[];

  sexOptions = [
    {name: 'Other', id: Sex.Other},
    {name: 'Male', id: Sex.Male},
    {name: 'Female', id: Sex.Female}
  ]

  /**
   * Constructor
   *
   * @param {CoreSidebarService} _coreSidebarService
   * @param {TravelerService} _travelerService
   */
  constructor(
    private _coreSidebarService: CoreSidebarService,
    private _travelerService: TravelerService
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
      let traveler: Traveler;
      if(this.travelerId === 0) {
        traveler = {
          firstName: this.firstname,
          middleName: this.middlename,
          lastName: this.lastname,
          address: this.address,
          sex: this.sex,
          nationalityCountryId: this.nationality,
          phoneNumber: this.phone,
          dob: this.dob,
          email: this.email
        }
        await this._travelerService.AddTraveler(traveler).toPromise()
      }
      else {
        traveler = {
          TravelerId: this.id,
          firstName: this.firstname,
          middleName: this.middlename,
          lastName: this.lastname,
          address: this.address,
          sex: this.sex,
          nationalityCountryId: this.nationality,
          phoneNumber: this.phone,
          dob: this.dob,
          email: this.email
        }
        var result: Traveler = await this._travelerService.UpdateTraveler(traveler).toPromise()
      }
      this.newItemEvent.emit(form.valid);
      this.toggleSidebar('new-traveler-sidebar');
    }
  }

  async ngOnInit(): Promise<void> { 
    this.countrylist = await this._travelerService.GetCountryList().toPromise();

  }
  

  async ngOnChanges(changes: SimpleChanges): Promise<void> {
    this.id = changes.travelerId.currentValue
    if(this.id > 0) {

      const response : GetTravelerUI = await this._travelerService.GetTravelerById(this.id).toPromise();

      this.travelerInfo = response;
      this.firstname = response.firstName;
      this.middlename = response.middleName;
      this.lastname = response.lastName;
      this.dob = response.dob;
      this.sex = response.sex
      this.address = response.address;
      this.nationality = response.nationality;
      this.phone = response.phoneNumber;
      this.email = response.email;
    }
  }
}
