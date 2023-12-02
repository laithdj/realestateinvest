import { Component, OnInit } from '@angular/core';
import * as CONSTANTS from 'src/app/core/constants';
import { PropertyService } from '../../services/property/property.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-images',
  templateUrl: './property-images.component.html',
  styleUrls: ['./property-images.component.scss']
})
export class PropertyImagesComponent implements OnInit {

  submitted: boolean;
  submitLoading: boolean;
  uploadLoading: boolean;
  errors: any = {};
  ERROR_MESSAGES = CONSTANTS.ERROR_MESSAGES;
  previewImages = [];
  propertyImages = [];
  selectedFile: File;

  constructor(
    private router: Router,
    private propertyService: PropertyService,
    private messageService: MessageService
  ) { }

  ngOnInit(): void {
    const existingImages = this.propertyService.getFormValue().images;
    console.log('existingImages', existingImages);
    this.renderPreviousFiles(existingImages);
    this.errors = {};
  }
  renderPreviousFiles(existingImage) {
    if (!Array.isArray(existingImage)) {
      return;
    }
    if (existingImage.length <= 0) {
      return;
    }
    this.propertyImages = existingImage;
    for (const existingImageValue of existingImage) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.previewImages.push({
          id: existingImageValue.id,
          image: e.target.result
        });
      };
      reader.readAsDataURL(existingImageValue);
    }
    
  }
  onChangeFile(event: any) {
    if (event.target?.files?.length) {
      this.selectedFile = event.target?.files[0];
    } else {
      this.selectedFile = null;
    }

  }
  onUploadFile(): void {
    console.log('onUploadFile called');
    if (!this.selectedFile) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please select file` });
      return;
    }
    this.uploadLoading = true;
    var fileExt = this.selectedFile.name.split('.').pop();
    if (['jpg', 'jpeg', 'png'].indexOf(fileExt) <= -1) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please upload only image file` });
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.previewImages.unshift({
        id: Date.now(),
        image: e.target.result
      });
      this.propertyImages.unshift(Object.assign(this.selectedFile, { id: Date.now() }));
      setTimeout(() => {
        this.uploadLoading = false;
      }, 1000);
    };
    reader.readAsDataURL(this.selectedFile);
  }
  onSubmitImages() {
    console.log('onSubmitImages called.');
    if (this.propertyImages?.length <= 0) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: `Please select any one image to continue` });
      return;
    }
    this.submitted = true;
    this.submitLoading = true;
    console.log('this.propertyImages', this.propertyImages);
    this.propertyService.setFormValue('IMAGES', this.propertyImages);
    const propertyFormNewValue = this.propertyService.getFormValue();
    console.log('propertyFormNewValue.images', propertyFormNewValue.images);
    setTimeout(() => {
      this.router.navigateByUrl(`/profile/add-property/seller-details`);
      this.submitLoading = false;
    }, 1000);
  }

  onPreviousPage(): void {
    this.router.navigateByUrl(`/profile/add-property/details`);
  }

}
