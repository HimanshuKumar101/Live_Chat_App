import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);

  const isLoggedIn = userService.getLoggedIn();

  // ✅ If route is login and user is already logged in → redirect to dashboard
  if (state.url === '/' && isLoggedIn) {
    router.navigate(['/chatDashboard']);
    return false;
  }

  // ✅ If route is dashboard and user is NOT logged in → redirect to login
  if (state.url === '/chatDashboard' && !isLoggedIn) {
    router.navigate(['/']);
    return false;
  }

  return true;
};
