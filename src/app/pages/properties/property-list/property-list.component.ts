import { ViewportScroller } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertyService } from '@pages/profile/services/property/property.service';
import { backendurl, baseurl } from 'src/environments/environment';

declare var $: any;
declare var noUiSlider: any;
declare var wNumb: any;

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.scss']
})
export class PropertyListComponent implements OnInit {

  propertyList: Array<{
    id: string;
    title: string;
    propertyType: string;
    image: string;
    propertyStatus: string;
    areaName: string;
    city: string;
    salePrice: string;
    hideSalePrice: boolean;
  }> = [];
  priceRangeFilter = null;
  searchForm = {
    title: '',
    type: 'ALL',
    category: 'ALL',
    city: 'ALL',
    bedrooms: 'ALL',
    bathrooms: 'ALL',
    propertyAge: 'ALL',
    landSize: 'ALL',
    areaSize: 'ALL',
    salePrice: 'ALL',
    rentYield: 'ALL',
    weeklyCurrentRent: 'ALL',
    weeeklyRentalAppraisal: 'ALL',
    propertyValueGrowth: 'ALL',
    rentalMarketPrice: 'ALL',
    vacancyRate: 'ALL',
    bodyCorporateValue: 'ALL',
    parkingAvailable: 'ALL',
    currentlyTenanted: 'ALL',
    floodZone: 'ALL',
    fireZone: 'ALL',
    landDAApproved: 'ALL',
    isBodyCorporate: 'ALL',
  };
  propertyTypes = [];
  propertyStatusList = [];
  cityList = [];
  isListLoading: boolean;

  constructor(
    private propertyService: PropertyService,
    private activatedRoute: ActivatedRoute,
    private viewport: ViewportScroller,
  ) { }

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((query: any) => {
      console.log('query', query);
      const filterData = this.getFilterValues(query);
      this.getPropertyList(filterData);
      
      // this.loadPriceRangeFilter();
      this.getPropertyTypesList();
      this.getPropertyStatusList();
      this.getCityList();
    })
  }
  ngAfterViewInit() {
    // $("select").niceSelect();
  }
  ngOnDestroy() {
    // if (this.priceRangeFilter.noUiSlider) {
    //   this.priceRangeFilter.noUiSlider.destroy();
    // }
  }
  // loadPriceRangeFilter() {
  //   // Price range filter
  //   this.priceRangeFilter = document.getElementById("price-range-filter-4") as any;
  //   if (this.priceRangeFilter) {
  //     noUiSlider.create(this.priceRangeFilter, {
  //       start: [0, 500000],
  //       connect: true,
  //       range: {
  //         min: 0,
  //         max: 700000,
  //       },
  //       format: wNumb({
  //         decimals: 0,
  //       }),
  //     });
  //     let marginMin = document.getElementById("price-range-min-4"),
  //       marginMax = document.getElementById("price-range-max-4");
  //     this.priceRangeFilter.noUiSlider.on("update", function (values, handle) {
  //       if (handle) {
  //         marginMax.innerHTML = values[handle];
  //       } else {
  //         marginMin.innerHTML = values[handle];
  //       }
  //     });
  //   }
  // }
  getFilterValues(query) {
    let filterValues = {} as any;
    if (query) {
      filterValues = Object.assign({}, query);
    }
    // if (query.title) {
    //   filterValues.title = query.title;
    // }
    // if (query.type) {
    //   filterValues.typeId = query.type;
    // }
    // if (query.category) {
    //   filterValues.statusId = query.category;
    // }
    // if (query.city) {
    //   filterValues.cityId = query.city;
    // }
    // if (query.landDAApproved) {
    //   filterValues.landDAApproved = query.landDAApproved;
    // }
    // if (query.bedrooms) {
    //   filterValues.bedrooms = query.bedrooms;
    // }
    // if (query.bathrooms) {
    //   filterValues.bathrooms = query.bathrooms;
    // }
    // if (query.propertyAge) {
    //   filterValues.propertyAge = query.propertyAge;
    // }
    // if (query.propertyAge) {
    //   filterValues.propertyAge = query.propertyAge;
    // }
    // if (query.salePrice) {
    //   filterValues.salePrice = query.salePrice;
    // }
    if (query.amenities) {
      filterValues.amenities = query.amenities.split('|');
    }
    return filterValues;
  }
  getPropertyTypesList(): void {
    this.propertyService.getPropertyTypes().subscribe(typeRes => {
      if (typeRes.length > 0) {
        this.propertyTypes = typeRes;
        setTimeout(() => {
          $("select.property-type").niceSelect();
        }, 100);

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
  // getPropertyList(filterData?: { title: string; typeId: string; statusId: string; cityId: string; landDAApproved?: string; bedrooms?: string; amenities?: Array<string> }) {
  getPropertyList(filterData?: any) {
    this.isListLoading = true;
    this.propertyList = [];
    const postData = typeof filterData !== 'undefined' ? filterData : {};
    this.propertyService.getProperties(postData).subscribe(
      (propRes: any) => {
        if (propRes.length) {
          for (const propValue of propRes) {
            let imageSrc = '';
            if (propValue.images?.length) {
              imageSrc = `${backendurl}/${propValue.images[0].path}`;
            }
            this.propertyList.push({
              id: propValue.id,
              title: propValue.title,
              propertyType: propValue.propertyType?.type,
              image: imageSrc,
              propertyStatus: propValue.propertyStatus?.status,
              areaName: propValue.areaName,
              city: propValue.city?.name,
              salePrice: propValue.salePrice,
              hideSalePrice: propValue.hideSalePrice
            })
          }
        }
        setTimeout(() => {
          this.isListLoading = false;
        }, 1000);
      },
      (propErr) => {
        this.propertyList = [];
        setTimeout(() => {
          this.isListLoading = false;
        }, 1000);
      }
    );
  }

  onAdvanceSearch(): void {
    console.log('this.searchForm', this.searchForm);
    const dataToSend = {} as any;
    if (this.searchForm.title) {
      dataToSend.title = this.searchForm.title;
    }
    if (this.searchForm.type !== 'ALL') {
      dataToSend.typeId = this.searchForm.type;
    }
    if (this.searchForm.category !== 'ALL') {
      dataToSend.statusId = this.searchForm.category;
    }
    if (this.searchForm.city !== 'ALL') {
      dataToSend.cityId = this.searchForm.city;
    }
    if (this.searchForm.bedrooms !== 'ALL') {
      dataToSend.bedrooms = this.searchForm.bedrooms;
    }
    if (this.searchForm.bathrooms !== 'ALL') {
      dataToSend.bathrooms = this.searchForm.bathrooms;
    }
    if (this.searchForm.propertyAge !== 'ALL') {
      dataToSend.propertyAge = this.searchForm.propertyAge;
    }
    if (this.searchForm.landSize !== 'ALL') {
      dataToSend.landSize = this.searchForm.landSize;
    }
    if (this.searchForm.areaSize !== 'ALL') {
      dataToSend.areaSize = this.searchForm.areaSize;
    }
    if (this.searchForm.salePrice !== 'ALL') {
      dataToSend.salePrice = this.searchForm.salePrice;
    }
    if (this.searchForm.rentYield !== 'ALL') {
      dataToSend.rentYield = this.searchForm.rentYield;
    }
    if (this.searchForm.weeklyCurrentRent !== 'ALL') {
      dataToSend.weeklyCurrentRent = this.searchForm.weeklyCurrentRent;
    }
    if (this.searchForm.weeeklyRentalAppraisal !== 'ALL') {
      dataToSend.weeeklyRentalAppraisal = this.searchForm.weeeklyRentalAppraisal;
    }
    if (this.searchForm.propertyValueGrowth !== 'ALL') {
      dataToSend.propertyValueGrowth = this.searchForm.propertyValueGrowth;
    }
    if (this.searchForm.rentalMarketPrice !== 'ALL') {
      dataToSend.rentalMarketPrice = this.searchForm.rentalMarketPrice;
    }
    if (this.searchForm.vacancyRate !== 'ALL') {
      dataToSend.vacancyRate = this.searchForm.vacancyRate;
    }
    if (this.searchForm.bodyCorporateValue !== 'ALL') {
      dataToSend.bodyCorporateValue = this.searchForm.bodyCorporateValue;
    }
    if (this.searchForm.parkingAvailable !== 'ALL') {
      dataToSend.parkingAvailable = this.searchForm.parkingAvailable;
    }
    if (this.searchForm.currentlyTenanted !== 'ALL') {
      dataToSend.currentlyTenanted = this.searchForm.currentlyTenanted;
    }
    if (this.searchForm.floodZone !== 'ALL') {
      dataToSend.floodZone = this.searchForm.floodZone;
    }
    if (this.searchForm.fireZone !== 'ALL') {
      dataToSend.fireZone = this.searchForm.fireZone;
    }
    if (this.searchForm.landDAApproved !== 'ALL') {
      dataToSend.landDAApproved = this.searchForm.landDAApproved;
    }
    if (this.searchForm.isBodyCorporate !== 'ALL') {
      dataToSend.isBodyCorporate = this.searchForm.isBodyCorporate;
    }
    this.getPropertyList(dataToSend);
    this.scrollToTop();
  }

  scrollToTop() {
    this.viewport.scrollToPosition([0, 0]);
  }

}
