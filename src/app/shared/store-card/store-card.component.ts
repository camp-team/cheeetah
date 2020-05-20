import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent implements OnInit {
  config: SwiperConfigInterface = {
    direction: 'horizontal',
    // navigation: true,
    // navigation: {
    //   nextEl: '.swiper-next',
    //   prevEl: '.swiper-prev',
    // },
    // pagination: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    slidesPerView: 1.3,
    spaceBetween: 16,
    initialSlide: 0,
    // loop: true,
    // autoHeight: true,
  };

  storeSlideId = 1;
  storeNumbers = [...Array(6)].map((_, i) => i + 1);

  constructor() {}

  ngOnInit(): void {}
}
