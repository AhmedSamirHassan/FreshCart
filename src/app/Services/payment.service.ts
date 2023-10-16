import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PaymentService {

  constructor(private _HttpClient:HttpClient) { }

  creatCashOrders(cardId: string, shippingAddress:any): Observable<any>{
    return this._HttpClient.post("https://ecommerce.routemisr.com/api/v1/orders/checkout-session/" + cardId +"?url=http://localhost:4200",{
      shippingAddress})
  }
}
