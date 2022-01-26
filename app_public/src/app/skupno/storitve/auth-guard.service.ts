import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AvtentikacijaService } from "./avtentikacija.service";

@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AvtentikacijaService, public router: Router) {}
  canActivate(): boolean {
    if(this.auth.jeAdmin())
      return true;
    this.router.navigate(['']);
    return false;
  }
}
