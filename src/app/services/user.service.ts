import { Injectable, effect, inject, isDevMode, signal } from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  onIdTokenChanged,
  signInWithPopup,
  signOut
} from '@angular/fire/auth';


export interface userData {
  photoURL: string | null;
  uid: string;
  displayName: string | null;
  email: string | null;
};


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private auth = inject(Auth);

  user$ = signal<{
    loading: boolean,
    data: userData | null
  }>({
    loading: true,
    data: null
  });

  constructor() {

    effect(() => {

      // toggle loading
      this.user$().loading = true;

      return onIdTokenChanged(this.auth, (_user: User | null) => {

        this.user$().loading = false;

        if (!_user) {
          this.user$().data = null;
          return;
        }

        // map data to user data type
        const { photoURL, uid, displayName, email } = _user;
        const data = { photoURL, uid, displayName, email };

        // print data in dev mode
        if (isDevMode()) {
          console.log(data);
        }

        // set store
        this.user$().data = data;
      });

    });

  }

  login() {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    signOut(this.auth);
  }

}