import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { baseurl } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  propertyForm = {
    general: {} as any,
    details: {} as any,
    images: {} as any,
    sellerDetails: {} as any,
  };

  constructor(
    private http: HttpClient
  ) { }

  setFormValue(formType: string, formValues: any) {
    console.log('formType', formType);
    console.log('formValues', formValues);
    switch (formType) {
      case 'GENERAL':
        this.propertyForm.general = formValues;
        break;
      case 'DETAILS':
        this.propertyForm.details = formValues;
        break;
      case 'IMAGES':
        this.propertyForm.images = formValues;
        break;
      case 'SELLER_DETAILS':
        this.propertyForm.sellerDetails = formValues;
        break;
      default:
        break;
    }
  }
  getFormValue() {
    return this.propertyForm;
  }
  resetPropertyForm() {
    this.propertyForm = {
      general: {} as any,
      details: {} as any,
      images: {} as any,
      sellerDetails: {} as any,
    };
  }

  getPropertyTypes(): any {
    return this.http.get(`${baseurl}/property/types`);
  }
  getPropertyStatus(): any {
    return this.http.get(`${baseurl}/property/status`);
  }
  getAmenities(): any {
    return this.http.get(`${baseurl}/property/amenities`);
  }
  getCities(): any {
    return this.http.get(`${baseurl}/property/cities`);
  }
  createProperty(): any {
    const propertyData = this.propertyForm;
    console.log('propertyData', propertyData);
    const formData: any = new FormData();
    if (propertyData.images?.length > 0) {
      for (let i = 0; i < propertyData.images.length; i++) {
        formData.append("images", propertyData.images[i], propertyData.images[i]['name']);
      }
    }
    if (propertyData.details.floorPlans?.length) {
      for (const floorPlanValue of propertyData.details.floorPlans) {
        if (!floorPlanValue.image?.name) {
          continue;
        }
        delete floorPlanValue.imageSrc;
        formData.append("floorPlanImages", floorPlanValue.image, floorPlanValue.image.name);
      }
    }
    formData.append('propertyData', JSON.stringify(propertyData));
    return this.http.post(`${baseurl}/property`, formData);
  }
  getUserProperties(): any {
    return this.http.get(`${baseurl}/property/user-properties`);
  }
  deleteProperty(propertyId: string): any {
    return this.http.delete(`${baseurl}/property/${propertyId}`);
  }
}
