import { Component, OnInit, Renderer2 } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})

export class CartComponent implements OnInit {

  cartproducts: any[] = []
  totalCartPrice: number = 0
  errorMessage: string = ''
  isLoading: boolean = false
  updateProductTimeOut: any
  cartId: string = ''

  constructor(private _cartServies : CartService, private _Renderer2:Renderer2){}

  ngOnInit(): void {
    this.getUserCartProducts()
  }
  getUserCartProducts(){
    this.isLoading = true
    this._cartServies.getUserCartProducts().subscribe({
      next: (res) => {
        this.isLoading = false
        this.cartproducts = res.data.products
        this.totalCartPrice = res.data.totalCartPrice
        this.cartId = res.data._id
      },
      error: (err)=>{
        this.isLoading = false
      }
    })
  }
  removeProductFromCart(productId:string){
    this._cartServies.removeProductFromCart(productId).subscribe({
      next: (res) => {
        this.cartproducts = res.data.products
        this.totalCartPrice = res.data.totalCartPrice
        this._cartServies.numOfCartItems.next(res.numOfCartItems)
      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  clearAll(){
    this._cartServies.clearAll().subscribe({
      next: (res) => {
        console.log(res)
        this.cartproducts = []
        this.totalCartPrice = 0
        this._cartServies.numOfCartItems.next(0)
      },
      error: (err)=>{
        console.log(err.error.message)
        if(err.error.message.includes('No cart exist for this user')){
          this.errorMessage = err.error.message
        }
      }
    })
  }

  updateCart(productId:string, count:number, el1:HTMLButtonElement, el2:HTMLButtonElement){
    if(count >= 1 ){
      this._Renderer2.setAttribute(el1, 'disabled', 'true')
      this._Renderer2.setAttribute(el2, 'disabled', 'true')
    // clearTimeout(this.updateProductTimeOut)
    // this.updateProductTimeOut = setTimeout(
    //   ()=>{
        this._cartServies.updateCart(productId,count).subscribe({
          next: (res) => {
            this.cartproducts = res.data.products
            this.totalCartPrice = res.data.totalCartPrice
            this._Renderer2.removeAttribute(el1, 'disabled')
            this._Renderer2.removeAttribute(el2, 'disabled')
          },
          error: (err)=>{
            this._Renderer2.removeAttribute(el1, 'disabled')
            this._Renderer2.removeAttribute(el2, 'disabled')
          }
        })
      // }, 1000)
    }
  }
}
