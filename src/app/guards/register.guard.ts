import { SettingsService } from './../services/settings.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';




@Injectable({
  providedIn: 'root'
})
export class RegisterGuard implements CanActivate {
  constructor(
    private router: Router,
    private settingsService: SettingsService
  ) { }

  canActivate(): boolean {
    if (this.settingsService.getSettings().allowRegistration) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
