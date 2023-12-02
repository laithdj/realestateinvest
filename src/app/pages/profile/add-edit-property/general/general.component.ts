import { Component, OnInit } from '@angular/core';
import * as CONSTANTS from 'src/app/core/constants';
import { PropertyService } from '../../services/property/property.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-general',
  templateUrl: './general.component.html',
  styleUrls: ['./general.component.scss']
})
export class GeneralComponent implements OnInit {

  propertyForm;
  submitted: boolean;
  submitLoading: boolean;
  errors: any = {};
  ERROR_MESSAGES = CONSTANTS.ERROR_MESSAGES;
  propertyTypes = [];
  propertyStatusList = [];
  cityList = [];

  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const generalDetails = this.propertyService.getFormValue().general;
    this.propertyForm = this.initialFormValues(generalDetails);
    this.errors = {};
    this.getPropertyTypesList();
    this.getPropertyStatusList();
    this.getCityList();
  }
  initialFormValues(generalValues: any) {
    return {
      type: generalValues?.type || null,
      title: generalValues?.title || '',
      areaName: generalValues?.areaName || '',
      city: generalValues?.city || null,
      address: generalValues?.address || '',
      description: generalValues?.description || '',
      propertyStatus: generalValues?.propertyStatus || null,
    }
  }

  getPropertyTypesList(): void {
    this.propertyService.getPropertyTypes().subscribe(typeRes => {
      if (typeRes.length > 0) {
        this.propertyTypes = typeRes;
      }
    })
  }
  getPropertyStatusList(): void {
    this.propertyService.getPropertyStatus().subscribe(statusRes => {
      if (statusRes.length > 0) {
        this.propertyStatusList = statusRes;
      }
    })
  }
  getCityList(): void {
    this.propertyService.getCities().subscribe(cityRes => {
      if (cityRes.length > 0) {
        this.cityList = cityRes;
      }
    })
  }

  validateGeneralForm(): boolean {
    this.errors = {};
    if (this.submitted) {
      Object.keys(this.propertyForm).forEach(field => {
        if (!this.propertyForm[field]) {
          this.errors[field] = true;
        }
      })
    }
    return Object.keys(this.errors).length > 0;
  }
  onSubmitGeneral() {
    console.log('onSubmitGeneral called.');
    this.submitted = true;
    const errors = this.validateGeneralForm();
    console.log('errors', errors);
    if (!errors) {
      this.submitLoading = true;
      this.propertyService.setFormValue('GENERAL', this.propertyForm);
      const propertyFormNewValue = this.propertyService.getFormValue();
      console.log('propertyFormNewValue.general', propertyFormNewValue.general);
      setTimeout(() => {
        this.router.navigateByUrl(`/profile/add-property/details`);
        this.submitLoading = false;
      }, 1000);
    }
  }

}
