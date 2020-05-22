import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { StoreCardComponent } from './store-card/store-card.component';

import { MatIconModule } from '@angular/material/icon';
import { SwiperModule } from 'ngx-swiper-wrapper';

@NgModule({
  declarations: [StoreCardComponent],
  imports: [CommonModule, SharedRoutingModule, MatIconModule, SwiperModule],
  exports: [StoreCardComponent],
})
export class SharedModule {}
