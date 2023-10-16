import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ForgetpasswordService {

  constructor(private _HttpClient:HttpClient) { }


  forgetPassword(userEmail:object):Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/forgotPasswords',userEmail)
  }

  resetCode(resetCode:object):Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/auth/verifyResetCode',resetCode)
  }

  resetPassword(newPassword:object):Observable<any> {
    return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/auth/resetPassword',newPassword)
  }
}
