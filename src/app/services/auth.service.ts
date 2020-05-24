import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore, User } from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = this.afAuth.user;

  afUser$: Observable<User> = this.afAuth.user;
  uid: string;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private snackBar: MatSnackBar
  ) {
    this.afUser$.subscribe((user) => {
      this.uid = user && user.uid;
    });
  }

  login() {
    return this.afAuth.signInAnonymously().then((result) => {
      this.db.doc(`users/${result.user.uid}`).set({
        uid: result.user.uid,
        createdAt: firestore.Timestamp.now(),
      });
      this.snackBar.open('Hello！🎉', null, {
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
    this.router.navigateByUrl('/');
  }
}
