import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isUserLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false)
  constructor(private _HttpClient: HttpClient, private _Router:Router) {
    if(localStorage.getItem('userToken') != null){
      this.isUserLoggedIn.next(true)
    }
   }


  register(registerForm: any):Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signup', registerForm)
  }

  logIn(logInForm: any):Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/signin', logInForm)
  }

  logOut(){
    localStorage.removeItem('userToken')
    this.isUserLoggedIn.next(false)
    this._Router.navigate(['login'])
  }
}
