import { Component, OnInit } from '@angular/core';
import * as CONSTANTS from 'src/app/core/constants';
import { PropertyService } from '../../services/property/property.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  propertyForm;
  submitted: boolean;
  submitLoading: boolean;
  errors: any = {};
  ERROR_MESSAGES = CONSTANTS.ERROR_MESSAGES;
  // amenitiesList = [
  //   'TV Cable', 'Swimming Pool', 'Sauna',
  //   'Air Conditioning', 'Laundry', 'Window Coverings',
  //   'Barbeque', 'Microwave', 'CC Camera', 'Gym', 'Lawn'
  // ]
  amenitiesList = [];
  floorPlans = [];

  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const propertyDetails = this.propertyService.getFormValue().details;
    this.propertyForm = this.initialFormValues(propertyDetails);
    this.errors = {};
    this.getAmenitiesList();
  }
  initialFormValues(detailValues: any) {
    this.setFloorPlan(detailValues?.floorPlans);
    return {
      bedrooms: detailValues?.bedrooms || null,
      propertyAge: detailValues?.propertyAge || null,
      landSize: detailValues?.landSize || '',
      area: detailValues?.area || '',
      salePrice: detailValues?.salePrice || null,
      rentYield: detailValues?.rentYield || null,
      weeklyCurrentRent: detailValues?.weeklyCurrentRent || null,
      weeeklyRentalAppraisal: detailValues?.weeeklyRentalAppraisal || null,
      propertyValueGrowth: detailValues?.propertyValueGrowth || null,
      rentalMarketPrice: detailValues?.rentalMarketPrice || null,
      vacancyRate: detailValues?.vacancyRate || null,
      parkingAvailable: detailValues?.parkingAvailable || false,
      currentlyTenanted: detailValues?.currentlyTenanted || false,
      fireZone: detailValues?.fireZone || false,
      floodZone: detailValues?.floodZone || false,
      landDAApproved: detailValues?.landDAApproved || false,
      isBodyCorporate: detailValues?.isBodyCorporate || false,
      bodyCorporateValue: detailValues?.bodyCorporateValue || null,
      amenities: detailValues?.amenities || [],
      floorPlans: detailValues?.floorPlans || [],
    }
  }
  setFloorPlan(existingFloorPlans: any) {
    const floorPlanValue = {
      title: '',
      image: null,
      imageSrc: ''
    }
    this.floorPlans = [];
    if (existingFloorPlans && existingFloorPlans.length > 0) {
      this.floorPlans = existingFloorPlans;
      return;
    }
    this.floorPlans.push(floorPlanValue);
  }
  addFloorPlan(): void {
    const floorPlanValue = {
      title: '',
      image: null,
      imageSrc: ''
    }
    this.floorPlans.push(floorPlanValue);
  }
  removeFloorPlan(index: number): void {
    this.floorPlans.splice(index, 1);
  }
  getAmenitiesList(): void {
    this.propertyService.getAmenities().subscribe(amenitiesRes => {
      if (amenitiesRes.length > 0) {
        this.amenitiesList = amenitiesRes;
      }
    })
  }
  onSelectFile(event: any, floorData: any) {
    if (!event.target?.files?.length) {
      return;
    }
    const selectedFile = event.target?.files[0];
    const fileExt = selectedFile.name.split('.').pop();
    if (['jpg', 'jpeg', 'png'].indexOf(fileExt) <= -1) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please upload only image file` });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      floorData.imageSrc = e.target.result;
      floorData.image = selectedFile;
    };
    reader.readAsDataURL(selectedFile);
  }

  validateDetailsForm(): boolean {
    this.errors = {};
    if (this.submitted) {
      Object.keys(this.propertyForm).forEach(field => {
        if (['rentYield','weeklyCurrentRent','weeeklyRentalAppraisal','rentalMarketPrice','vacancyRate','parkingAvailable','currentlyTenanted',
      'floodZone','fireZone','landDAApproved','isBodyCorporate','bodyCorporateValue'].indexOf(field) > -1) {
          return;
        }
        if (!this.propertyForm[field]) {
          this.errors[field] = true;
        }
      })
    }
    return Object.keys(this.errors).length > 0;
  }
  onSubmitDetails() {
    console.log('onSubmitDetails called.');
    this.submitted = true;
    const errors = this.validateDetailsForm();
    console.log('errors', errors);
    if (!errors) {
      this.submitLoading = true;
      if (this.floorPlans.length) {
        this.propertyForm.floorPlans = this.floorPlans.filter(obj => obj.title || obj.image);
      }
      this.propertyService.setFormValue('DETAILS', this.propertyForm);
      const propertyFormNewValue = this.propertyService.getFormValue();
      console.log('propertyFormNewValue.details', propertyFormNewValue.details);
      setTimeout(() => {
        this.router.navigateByUrl(`/profile/add-property/images`);
        this.submitLoading = false;
      }, 1000);
    }
  }

  onPreviousPage(): void {
    this.router.navigateByUrl(`/profile/add-property/general`);
  }

}
