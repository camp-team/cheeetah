import { Injectable } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { map, debounceTime, take } from 'rxjs/operators';

import { StoreService } from '../services/store.service';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UniqueNameValidator {
  constructor(private storeService: StoreService) {}

  static storename(db: AngularFirestore) {
    return (control: AbstractControl) => {
      const storename = control.value.replace(/\s+/g, '').toLowerCase();
      console.log(storename);
      return db
        .collection('stores', (ref) => ref.where('storename', '==', storename))
        .valueChanges()
        .pipe(
          debounceTime(500),
          take(1),
          map((arr) => (arr.length ? { storenameAvailable: false } : null))
        );
    };
  }
}
