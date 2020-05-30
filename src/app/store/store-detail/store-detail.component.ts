import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StoreService } from 'src/app/services/store.service';
import { Observable } from 'rxjs';
import { Store } from '@interfaces/store';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-store-detail',
  templateUrl: './store-detail.component.html',
  styleUrls: ['./store-detail.component.scss'],
})
export class StoreDetailComponent implements OnInit {
  store$: Observable<Store> = this.route.paramMap.pipe(
    switchMap((map) => {
      const storeId = map.get('storeId');
      return this.storeService.getStoreById(storeId);
    })
  );

  constructor(
    private route: ActivatedRoute,
    private storeService: StoreService
  ) {}

  ngOnInit() {}
}
