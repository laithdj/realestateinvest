import { Component, OnInit } from '@angular/core';
import { PropertyForm } from 'src/app/core/interfaces/property-form';

@Component({
  selector: 'app-add-edit-property',
  templateUrl: './add-edit-property.component.html',
  styleUrls: ['./add-edit-property.component.scss']
})
export class AddEditPropertyComponent implements OnInit {

  propertyForm = {} as PropertyForm;
  errors: any = {};
  propertyTypes = [
    { id: 1, name: 'Project 1', },
    { id: 2, name: 'Project 2', },
    { id: 3, name: 'Project 3', },
    { id: 4, name: 'Project 4', },
    { id: 5, name: 'Project 5', },
  ]


  constructor() { }

  ngOnInit(): void {
  }

}
