import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User } from '@interfaces/user';
import { Store } from '@interfaces/store';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(private db: AngularFirestore) {}

  getUsers(): Observable<User[]> {
    return this.db.collection<User>('users').valueChanges();
  }

  getStores(): Observable<Store[]> {
    return this.db.collection<Store>('stores').valueChanges();
  }
}
