import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = this.afAuth.user;

  constructor(
    private afAuth: AngularFireAuth,
    private db: AngularFirestore,
    private snackBar: MatSnackBar
  ) {}

  login() {
    return this.afAuth.signInAnonymously().then((result) => {
      this.db.doc(`users/${result.user.uid}`).set({
        uid: result.user.uid,
        createdAt: firestore.Timestamp.now(),
      });
      this.snackBar.open('ログインしました！🎉', null, {
        duration: 2000,
      });
    });
  }

  logout(uid: string) {
    this.afAuth.signOut().then(() => {
      this.snackBar.open('ログアウトしました！🚀', null, {
        duration: 2000,
      });
    });
  }
}
