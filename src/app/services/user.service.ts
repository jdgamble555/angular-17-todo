import {
  Injectable,
  OnDestroy,
  inject,
  isDevMode
} from '@angular/core';
import {
  Auth,
  GoogleAuthProvider,
  User,
  onIdTokenChanged,
  signInWithPopup,
  signOut
} from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

export interface UserData {
  photoURL: string | null;
  uid: string;
  displayName: string | null;
  email: string | null;
};

type UserType = {
  loading: boolean;
  data: UserData | null;
};


@Injectable({
  providedIn: 'root'
})
export class UserService implements OnDestroy {

  private auth = inject(Auth);
  private _user = new BehaviorSubject<UserType>({
    loading: true,
    data: null
  });
  private _subscription = this._getUser();

  user = this._user.asObservable();

  private _getUser() {
    return onIdTokenChanged(
      this.auth,
      (_user: User | null) => {

        if (!_user) {
          this._user.next({
            loading: false,
            data: null
          });
          return;
        }

        // map data to user data type
        const {
          photoURL,
          uid,
          displayName,
          email
        } = _user;
        const data = {
          photoURL,
          uid,
          displayName,
          email
        };

        // print data in dev mode
        if (isDevMode()) {
          console.log(data);
        }

        // set store
        this._user.next({
          data,
          loading: false
        });
      });
  }

  ngOnDestroy(): void {
    console.log('destroying user...');
    this._subscription();
  }

  login() {
    signInWithPopup(this.auth, new GoogleAuthProvider());
  }

  logout() {
    signOut(this.auth);
  }
}
