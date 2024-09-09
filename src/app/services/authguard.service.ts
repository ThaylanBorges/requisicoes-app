import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';

import { CanActivateFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthguardService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  canActivateFn: CanActivateFn = (route, state) => {
    return this.fireAuth.authState.pipe(
      take(1),
      map((user) => !!user),
      tap((loggedIn) => {
        if (!loggedIn) {
          this.router.navigate(['/login']);
        }
      })
    );
  };
}
