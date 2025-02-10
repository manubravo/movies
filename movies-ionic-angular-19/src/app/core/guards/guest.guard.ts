import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const guestGuard: CanActivateFn = async () => {
  
  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (!sessionService.tokenLoaded()) {
    await sessionService.initSession();
  }

  if (sessionService.userToken()) {
    router.navigate(['/home']);
    return false;
  }

  return true;
};