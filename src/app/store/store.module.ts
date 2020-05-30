import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreRoutingModule } from './store-routing.module';
import { StoreDetailComponent } from './store-detail/store-detail.component';

@NgModule({
  declarations: [StoreDetailComponent],
  imports: [CommonModule, StoreRoutingModule],
})
export class StoreModule {}
