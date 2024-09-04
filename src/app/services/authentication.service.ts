import { Injectable } from '@angular/core';

import { filter, Observable } from 'rxjs';

// firebase
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  user: Observable<firebase.User>;

  constructor(private fireAuth: AngularFireAuth) {
    this.user = fireAuth.authState.pipe(
      filter((user) => !!user)
    ) as Observable<firebase.User>;
  }

  authUser(): Observable<firebase.User> {
    return this.user;
  }

  login(
    email: string,
    password: string
  ): Promise<firebase.auth.UserCredential> {
    console.log(email, password);

    return this.fireAuth.signInWithEmailAndPassword(email, password);
  }

  logout(): Promise<void> {
    return this.fireAuth.signOut();
  }

  resetPassword(email: string) {
    return this.fireAuth.sendPasswordResetEmail(email);
  }
}
