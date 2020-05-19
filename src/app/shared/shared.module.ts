import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { StoreCardComponent } from './store-card/store-card.component';

@NgModule({
  declarations: [StoreCardComponent],
  imports: [CommonModule, SharedRoutingModule],
  exports: [StoreCardComponent],
})
export class SharedModule {}
