import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { User } from '@interfaces/user';
import { Store } from '@interfaces/store';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root',
})
export class StoreService {
  constructor(
    private db: AngularFirestore,
    private snackBar: MatSnackBar,
    private router: Router
  ) {}

  getUsers(): Observable<User[]> {
    return this.db.collection<User>('users').valueChanges();
  }

  getStores(): Observable<Store[]> {
    return this.db
      .collection<Store>('stores', (ref) => {
        return ref.orderBy('createdAt', 'desc').limit(15);
      })
      .valueChanges();
  }

  getStoreById(storeId: string): Observable<Store> {
    return this.db.doc<Store>(`stores/${storeId}`).valueChanges();
  }

  createStore(store: Omit<Store, 'storeId' | 'createdAt'>) {
    const storeId = this.db.createId();
    this.db
      .doc(`stores/${storeId}`)
      .set({
        storeId,
        ...store,
        createdAt: firestore.Timestamp.now(),
        updatedAt: firestore.Timestamp.now(),
      })
      .then(() => {
        this.snackBar.open('ストアを作成しました');
        this.router.navigateByUrl('/');
      });
  }
}
