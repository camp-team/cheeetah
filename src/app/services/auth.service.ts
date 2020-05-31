import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { auth, firestore } from 'firebase/app';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { User } from '@interfaces/user';
import { Status } from '@interfaces/status';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  uid: string;
  userLoginStatus: boolean;
  ownerLoginStatus: boolean;

  user$: Observable<User> = this.afAuth.authState.pipe(
    switchMap((afUser) => {
      if (afUser) {
        return this.db.doc<User>(`users/${afUser.uid}`).valueChanges();
      } else {
        return of(null);
      }
    })
  );

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private db: AngularFirestore,
    private snackBar: MatSnackBar
  ) {
    this.user$.subscribe((user) => {
      this.uid = user && user.uid;
    });
  }

  loginAnonymous() {
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

  loginUser() {
    this.afAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {
        const userData = {
          uid: result.user.uid,
          status: 'user',
          email: result.user.email,
          name: result.user.displayName,
          avatarURL: result.user.photoURL,
          isOwner: false,
          createdAt: firestore.Timestamp.now(),
        };
        this.db.doc(`users/${result.user.uid}`).set(userData);
        localStorage.setItem('Status', 'User');
        this.userLoginStatus = true;
        this.snackBar.open('Hello!ログインしました 🎉', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        this.snackBar.open(`${error},ログインに失敗しました。`, null, {
          duration: 2000,
        });
      });
  }

  loginOwner() {
    this.afAuth
      .signInWithPopup(new auth.GoogleAuthProvider())
      .then((result) => {
        const OwnerData = {
          uid: result.user.uid,
          status: 'owner',
          email: result.user.email,
          name: result.user.displayName,
          avatarURL: result.user.photoURL,
          isOwner: true,
          createdAt: firestore.Timestamp.now(),
        };
        this.db.doc(`users/${result.user.uid}`).set(OwnerData);
        localStorage.setItem('Status', 'Owner');
        this.ownerLoginStatus = true;
        this.snackBar.open('オーナーとしてログインしました!', null, {
          duration: 2000,
        });
        this.router.navigateByUrl('/');
      })
      .catch((error) => {
        this.snackBar.open(`${error},ログインに失敗しました。`, null, {
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

  getLoginUser(uid: string): Observable<Status> {
    return this.db.doc<Status>(`users/${uid}`).valueChanges();
  }

  getLoginOwner(uid: string): Observable<Status> {
    return this.db.doc<Status>(`users/${uid}`).valueChanges();
  }
}
