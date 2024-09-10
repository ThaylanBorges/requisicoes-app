import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, take, tap } from 'rxjs';

import { AngularFireAuth } from '@angular/fire/compat/auth';

export const authGuardGuard: CanActivateFn = (route, state) => {
  const fireAuth = inject(AngularFireAuth);
  const router = inject(Router);

  return fireAuth.authState.pipe(
    take(1),
    map((user) => !!user),
    tap((loggedIn) => {
      if (!loggedIn) {
        router.navigate(['/login']);
      }
    })
  );
};
