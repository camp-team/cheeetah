import { Component, OnInit } from '@angular/core';
import { SwiperConfigInterface } from 'ngx-swiper-wrapper';
import { StoreService } from 'src/app/services/store.service';

@Component({
  selector: 'app-store-card',
  templateUrl: './store-card.component.html',
  styleUrls: ['./store-card.component.scss'],
})
export class StoreCardComponent implements OnInit {
  config: SwiperConfigInterface = {
    direction: 'horizontal',
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    },
    slidesPerView: 1.3,
    spaceBetween: 16,
    initialSlide: 0,
  };

  storeSlideId = 1;
  storeNumbers = [...Array(6)].map((_, i) => i + 1);

  stores$ = this.storeService.getStores();
  users$ = this.storeService.getUsers();

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {}
}
