import { Component, OnInit } from '@angular/core';
import * as CONSTANTS from 'src/app/core/constants';
import { PropertyService } from '../../services/property/property.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-seller-details',
  templateUrl: './seller-details.component.html',
  styleUrls: ['./seller-details.component.scss']
})
export class SellerDetailsComponent implements OnInit {

  propertyForm;
  submitted: boolean;
  submitLoading: boolean;
  errors: any = {};
  ERROR_MESSAGES = CONSTANTS.ERROR_MESSAGES;

  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const existingSellerDetails = this.propertyService.getFormValue().sellerDetails;
    this.propertyForm = this.initialFormValues(existingSellerDetails);
    this.errors = {};
  }
  initialFormValues(sellerValues: any) {
    return {
      sellerName: sellerValues?.sellerName || '',
      sellerEmail: sellerValues?.sellerEmail || '',
      sellerNumber: sellerValues?.sellerNumber || '',
      sellerAddress: sellerValues?.sellerAddress || '',
    }
  }
  validateSellerDetailsForm(): boolean {
    this.errors = {};
    if (this.submitted) {
      Object.keys(this.propertyForm).forEach(field => {
        if (['sellerAddress'].indexOf(field) > -1) {
          return;
        }
        if (!this.propertyForm[field]) {
          this.errors[field] = true;
        }
      })
    }
    return Object.keys(this.errors).length > 0;
  }
  onSubmitSellerDetails() {
    console.log('onSubmitSellerDetails called.');
    this.submitted = true;
    const errors = this.validateSellerDetailsForm();
    console.log('errors', errors);
    if (!errors) {
      this.submitLoading = true;
      this.propertyService.setFormValue('SELLER_DETAILS', this.propertyForm);
      const propertyFormNewValue = this.propertyService.getFormValue();
      console.log('propertyFormNewValue.sellerDetails', propertyFormNewValue.sellerDetails);
      this.addProperty()
      // setTimeout(() => {
      //   this.submitLoading = false;
      // }, 1000);
    }
  }
  addProperty(): void {
    this.propertyService.createProperty().subscribe(
      (createRes: any) => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Property added.' });
        setTimeout(() => {
          this.router.navigateByUrl(`/profile/my-properties`);
          this.resetPropertyForm();
          this.submitLoading = false;
        }, 1000);
      },
      (createErr: any) => {
        if (createErr.error?.message) {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: createErr.error?.message });
        } else {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: this.ERROR_MESSAGES.SOMETHING_WRONG });
        }
        this.submitLoading = false;
      }
    )
  }
  resetPropertyForm() {
    this.submitted = false;
    this.errors = {};
    this.propertyForm = this.initialFormValues({});
    this.propertyService.resetPropertyForm();
  }

  onPreviousPage(): void {
    this.router.navigateByUrl(`/profile/add-property/images`);
  }

}
