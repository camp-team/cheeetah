import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedRoutingModule } from './shared-routing.module';
import { StoreCardComponent } from './store-card/store-card.component';

import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [StoreCardComponent],
  imports: [CommonModule, SharedRoutingModule, MatIconModule],
  exports: [StoreCardComponent],
})
export class SharedModule {}
