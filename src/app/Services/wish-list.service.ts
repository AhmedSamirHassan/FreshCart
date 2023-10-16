import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishListService {
  // wishListItems = new BehaviorSubject<{id:string, count:number, price: number}[]| null>(null)

  numOfWishListItems: BehaviorSubject<number> = new BehaviorSubject(0)
  constructor(private _HttpClient:HttpClient) {
    this.getAllProductsOfWishList().subscribe((res)=>{
      this.numOfWishListItems.next(res.data.length)
    })
  }

  addProductToWishList(productId: string) : Observable<any> {
    return this._HttpClient.post('https://ecommerce.routemisr.com/api/v1/wishlist',{productId : productId})
  }

  getAllProductsOfWishList():Observable<any> {
    return this._HttpClient.get('https://ecommerce.routemisr.com/api/v1/wishlist')
  }

  removeProductFromWishList(productId: string): Observable<any>{
    return this._HttpClient.delete( 'https://ecommerce.routemisr.com/api/v1/wishlist/'+productId)
  }


}
