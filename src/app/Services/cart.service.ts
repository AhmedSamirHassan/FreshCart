import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numOfCartItems: BehaviorSubject<number> = new BehaviorSubject(0)
  constructor(private _HttpClient:HttpClient) {
    this.getUserCartProducts().subscribe((res)=>{
      this.numOfCartItems.next(res.numOfCartItems)
    })
  }

  addProductToCart(productId: string): Observable<any>{
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/cart',{
      productId : productId
    })
  }

  getUserCartProducts(): Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/cart')
}

removeProductFromCart(productId: string): Observable<any>{
  return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart/'+productId)
}

clearAll():Observable<any> {
  return this._HttpClient.delete('https://ecommerce.routemisr.com/api/v1/cart')
}

updateCart(productId: string, count:number): Observable<any>{
  return this._HttpClient.put('https://ecommerce.routemisr.com/api/v1/cart/'+productId,{count})
}
}
