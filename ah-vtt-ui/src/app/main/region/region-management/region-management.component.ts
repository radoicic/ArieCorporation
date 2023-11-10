import { ViewEncapsulation } from '@angular/core';
import { Component, TemplateRef } from '@angular/core';
import { FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ValidatorService } from '@core/services/validator.service';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ContentHeader } from 'app/layout/components/content-header/content-header.component';
import { ToastrService } from 'ngx-toastr';
import { merge } from 'rxjs';
import { mapTo } from 'rxjs/operators';
import { ILookupRegion, Region, RegionType, RegionViewLabels } from '../region.model';
import { RegionService } from '../region.service';

@Component({
  selector: 'app-region-management',
  templateUrl: './region-management.component.html',
  styleUrls: ['./region-management.component.scss'], 
  encapsulation: ViewEncapsulation.None
})
export class RegionManagementComponent {
  public contentHeader: ContentHeader = {
    headerTitle: 'Region',
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
          name: 'Region',
          isLink: true,
          link: './'
        }
      ]
    }
  }
  public activeRegion: Region = {id: null, regionType: null} as Region;
  public lookupRegions: {lookupRegions: ILookupRegion[]} = {lookupRegions: null}; 
  public regionForm: FormGroup;
  public submitted = false;
  public loading = false;
  public modal: NgbModalRef;
  public labels: RegionViewLabels = {} as RegionViewLabels;
  constructor(private router: Router,
    private route: ActivatedRoute,
    private regionService: RegionService,
    private modalService: NgbModal,
    private formBuilder: UntypedFormBuilder,
    private toastrService: ToastrService,
    private validator: ValidatorService) {
    merge(this.route.url.pipe(mapTo({} as Params)), this.route.queryParams).subscribe(async (params: Params) => {
      await this.onUrlChange(params)
    })
    this.regionForm = this.formBuilder.group({
      id: [0],
      name: ['', Validators.required],
      lat: [0, validator.latitude()],
      long: [0, validator.longitude()],
      regionType: [0],
      parentId: [null],
      lookupCountryId: [0]
    })
  }
  async onUrlChange(params: Params){
    await this.loadSubRegions(params);
    this.prepareBreadcrumbs();
    this.prepareLabels();
  }
  prepareBreadcrumbs(): void {
    this.contentHeader.breadcrumb.links = [
      {
        name: 'Home',
        isLink: true,
        link: '/'
      },
      {
        name: 'Region',
        isLink: true,
        link: './'
      }
    ]
    if(this.activeRegion.parentCountry){
      this.contentHeader.breadcrumb.links.push({
        name: this.activeRegion.parentCountry.name,
        isLink: true,
        link: `./`,
        queryParams: {
          countryId: this.activeRegion.parentCountry.id
        }
      })
    }
    if(this.activeRegion.parentProvince){
      this.contentHeader.breadcrumb.links.push({
        name: this.activeRegion.parentProvince.name,
        isLink: true,
        link: `./`,
        queryParams: {
          provinceId: this.activeRegion.parentProvince.id
        }
      })
    }
    if(this.activeRegion.parentDistrict){
      this.contentHeader.breadcrumb.links.push({
        name: this.activeRegion.parentDistrict.name,
        isLink: true,
        link: `./`,
        queryParams: {
          districtId: this.activeRegion.parentDistrict.id
        }
      })
    }
  }
  async loadSubRegions(query: Params): Promise<void> {
    if(query.countryId){
      this.activeRegion = {
        regionType: RegionType.Country,
        id: query.countryId
      } as Region;
    }
    else if(query.provinceId){
      this.activeRegion = {
        regionType: RegionType.Province,
        id: query.provinceId
      } as Region;
    }
    else if(query.districtId){
      this.activeRegion = {
        regionType: RegionType.District,
        id: query.districtId
      } as Region;
    }
    else if(query.villageId){
      this.activeRegion = {
        regionType: RegionType.Village,
        id: query.villageId
      } as Region;
    }
    else {
      this.activeRegion = {
        regionType: null,
        id: null
      } as Region;
    }
    this.activeRegion = await this.regionService.getRegionDetails(this.activeRegion.id, this.activeRegion.regionType).toPromise();
    this.lookupRegions = await this.regionService.GetLookupRegions().toPromise();
  }

  openSubRegion(subRegion: Region): void {
    let queryParams: Params = {};
    switch(subRegion.regionType){
      case RegionType.Country:
        queryParams.countryId = subRegion.id;
        break;
      case RegionType.Province:
        queryParams.provinceId = subRegion.id;
        break;
      case RegionType.District:
        queryParams.districtId = subRegion.id;
        break;
      case RegionType.Village:
        queryParams.villageId = subRegion.id;
        break;
    }
    this.router.navigate(['region/manage'], {
      queryParams
    })
  }

  refreshAndOpenForm(template: TemplateRef<any>): void {
    this.modal = this.modalService.open(template, {
      windowClass: 'modal'
    })
    this.regionForm.reset();
    this.submitted = false;
  }

  editClicked(template: TemplateRef<any>, subRegion: Region){
    this.refreshAndOpenForm(template);
    this.regionForm.setValue({
      id: subRegion.id,
      lat: subRegion.lat,
      long: subRegion.long,
      name: subRegion.name,
      regionType: null,
      parentId: null,
      lookupCountryId: subRegion.lookupCountryId
    })
  }

  async onSubmit(): Promise<void> {
    if(this.activeRegion.regionType === RegionType.Country)
      this.formData.regionType.setValue(RegionType.Province);
    else
      this.formData.regionType.setValue(this.activeRegion.regionType ? this.activeRegion.regionType + 1 : RegionType.Country)
    this.formData.parentId.setValue(this.activeRegion.id);
    this.submitted = true;
    if(this.regionForm.invalid) return;
    const selectedCountry = this.lookupRegions?.lookupRegions?.find(x=>x.name === this.regionForm.value?.name);
    this.formData.lookupCountryId.setValue(selectedCountry?.id); // Added to have lookup Id for flag
    try{
      let result = {} as Region;
      this.loading = true;
      if(!this.regionForm.value?.id){
        result = await this.regionService.addRegion(this.regionForm.value).toPromise();
        this.activeRegion.subRegions.push({...result,  smallCode: selectedCountry.smallCode});
      }
      else{
        result = await this.regionService.updateRegion(this.regionForm.value).toPromise();
        let index = this.activeRegion.subRegions.findIndex(x => x.id === this.regionForm.value.id);
        this.activeRegion.subRegions[index] = {...result,  smallCode: selectedCountry.smallCode};
      }
      
      this.toastrService.success('Saved Successfully')
      this.modal.close();
    }
    catch{
      this.toastrService.error('Something went wrong')
    }
    finally{
      this.submitted = false;
      this.loading = false;
    }

  }

  get formData() {
    return this.regionForm.controls;
  }

  public prepareLabels(): void{
    switch(this.activeRegion.regionType){
        case null:
          this.labels = {
            addButton : 'Add Region',
            pageHeader : 'Manage Regions',
            addModalHeader : 'Add New Region',
            editModalHeader : `Update Region`
          }
          break;
        case RegionType.Country:
          this.labels =  {
            addButton: `Add Province`,
            pageHeader: `Manage Provinces in ${this.activeRegion.parentCountry.name}`,
            addModalHeader: `Add Province in ${this.activeRegion.parentCountry.name}`,
            editModalHeader: `Update Province`
          }
          break;
        case RegionType.Province:
          this.labels =  {
            addButton: `Add District`,
            pageHeader: `Manage Districts in ${this.activeRegion.parentProvince.name}`,
            addModalHeader: `Add District in ${this.activeRegion.parentProvince.name}`,
            editModalHeader: `Update District`
          }
          break;
        case RegionType.District:
          this.labels =  {
            addButton: `Add Village`,
            pageHeader: `Manage Villages in ${this.activeRegion.parentDistrict.name}`,
            addModalHeader: `Add Village in ${this.activeRegion.parentDistrict.name}`,
            editModalHeader: `Update Village`
          }
          break;
        case RegionType.Village:
          this.labels =  {
            addButton: `Add SDP`,
            pageHeader: `Manage SDPs' in ${this.activeRegion.parentVillage.name}`,
            addModalHeader: `Add SDP in ${this.activeRegion.parentVillage.name}`,
            editModalHeader: `Update SDP`
          }
          break;
      }
    
    }
}
