import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import jwtDecode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _Router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (localStorage.getItem('userToken') != null) {
    if(route.routeConfig?.path?.toLowerCase() == 'login'){
      this._Router.navigate(['/home'])
      return false
    }
      try {
        jwtDecode(localStorage.getItem('userToken')||"")
        return true
      } catch (error) {
        localStorage.removeItem('userToken')
        this._Router.navigate(['/login'])
        return false
      }
      return true
    }
    else {
      this._Router.navigate(['/login'])
      return false;
    }
  }
}

