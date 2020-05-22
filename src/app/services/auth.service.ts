import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = this.afAuth.user;

  constructor(private afAuth: AngularFireAuth, private db: AngularFirestore) {}

  login() {
    return this.afAuth.signInAnonymously().then((result) => {
      this.db.doc(`users/${result.user.uid}`).set({
        uid: result.user.uid,
        createdAt: firestore.Timestamp.now(),
      });
    });
  }

  logout(uid: string) {
    this.afAuth.signOut();
  }
}
