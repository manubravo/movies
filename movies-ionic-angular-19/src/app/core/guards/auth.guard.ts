import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { SessionService } from '../services/session.service';

export const authGuard: CanActivateFn = async () => {

  const sessionService = inject(SessionService);
  const router = inject(Router);

  if (!sessionService.tokenLoaded()) {
    await sessionService.initSession();
  }
  
  if (!sessionService.userToken()) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};