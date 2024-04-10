import {
  Injectable,
  OnDestroy,
  OnInit,
  inject,
  isDevMode,
  signal
} from '@angular/core';
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
export class UserService implements OnDestroy {

  private auth = inject(Auth);

  private unsubscribe = () => { };

  user$ = signal<{
    loading: boolean,
    data: userData | null
  }>({
    loading: true,
    data: null
  });

  constructor() {

    // toggle loading
    this.user$().loading = true;

    // server environment
    if (!this.auth) {
      this.user$().loading = false;
      this.user$().data = null;
      return;
    }

    this.unsubscribe = onIdTokenChanged(
      this.auth,
      (_user: User | null) => {

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
  }

  ngOnDestroy(): void {
    this.unsubscribe();
  }

  login() {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    signOut(this.auth);
  }
}
