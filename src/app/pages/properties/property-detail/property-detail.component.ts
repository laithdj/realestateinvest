import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Route } from '@angular/router';
import { PropertyService } from '@pages/profile/services/property/property.service';
import { backendurl } from 'src/environments/environment';
import * as moment from 'moment';

declare var $: any;
declare var Swiper: any;

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {

  details: any = {};
  latestProperties: any = [];
  id: string;
  backendurl = backendurl;
  swiperSliderMain = null;
  swiperSliderThumb = null;
  constructor(
    private propertyService: PropertyService,
    private activateRoute: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.activateRoute.params.subscribe((param: any) => {
      this.details = {};
      if (param.id) {
        this.id = param.id;
        this.getPropertyDetail(param.id);
        this.getLatestProperties(param.id);
      }
    })
  }
  ngOnDestroy() {
    if (this.swiperSliderMain) {
      this.swiperSliderMain.destroy();
    }
    if (this.swiperSliderThumb) {
      this.swiperSliderThumb.destroy();
    }
  }
  loadSlider() {
    this.swiperSliderMain = new Swiper(".featured-thum-slider2", {
      spaceBetween: 5,
      slidesPerView: 5,
      freeMode: true,
      watchSlidesVisibility: true,
      watchSlidesProgress: true,
      loop: false,
      breakpoints: {
        0: {
          slidesPerView: 3,
        },
        768: {
          slidesPerView: 5,
        },
      },
    });

    this.swiperSliderThumb = new Swiper(".feature-box3", {
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },
      loop: false,
      autoplay: {
        delay: 5000,
      },
      thumbs: {
        swiper: this.swiperSliderMain,
      },
    });
    /*----------------------------- Product Image Zoom --------------------------------*/
    $('.zoom-image-hover').zoom();
  }
  getPropertyDetail(propertyId: string) {
    this.details = {};
    this.propertyService.getPropertiesById(propertyId).subscribe(
      (propRes) => {
        console.log('propRes', propRes);
        this.details = propRes;
        this.details.timeLong = this.getPostedTimeline(propRes.createdAt);
        setTimeout(() => {
          this.loadSlider();
        }, 1000);

      },
      (propErr) => {
        console.error('propErr', propErr);
        this.details = {};
      }
    );
  }
  getPostedTimeline(createdDate): string {
    const years = moment().diff(createdDate, 'years');
    if (years > 0) {
      return `${years} years old`;
    }
    const months = moment().diff(createdDate, 'months');
    if (months > 0) {
      return `${months} months old`;
    }
    const days = moment().diff(createdDate, 'days');
    if (days > 0) {
      return `${days} days old`;
    }
    return ``;
  }
  getLatestProperties(propertyId: string) {
    this.latestProperties = [];
    this.propertyService.getLatestProperties(propertyId).subscribe(
      (propRes) => {
        console.log('propRes', propRes);
        this.latestProperties = propRes;
      },
      (propErr) => {
        console.error('propErr', propErr);
        this.latestProperties = [];
      }
    );
  }

}
