import { Component, Input, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CartService } from 'src/app/Services/cart.service';
import { ProductsService } from 'src/app/Services/products.service';
import { WishListService } from 'src/app/Services/wish-list.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent {

  SearchByText(ev:any){
    this.DisplayedProds = this.products.filter(prod => (prod.title as string).toLowerCase().includes(ev.target.value.toLowerCase()))
  }
  constructor(private prodService:ProductsService,private _cartService: CartService, private toastr: ToastrService,private _wishListService:WishListService) {

  }

  products: any[] = []
  DisplayedProds:any[] = []
  wishList: string[] = []
  ngOnInit(): void {
    this.prodService.getAllProducts().subscribe((res)=>{
      console.log(res)
      this.products = res.data
      this.DisplayedProds = res.data
    })
    this._wishListService.getAllProductsOfWishList().subscribe({
      next: (res)=>{
        console.log(res)
        const newData = res.data.map((item:any)=>item._id)
        this.wishList = newData
      }
    })
  }

  addProductToCart(productId: string) {
    this._cartService.addProductToCart(productId).subscribe((res)=>{
      console.log(res)
      this._cartService.numOfCartItems.next(res.numOfCartItems)
      this.toastr.success('Product added to Cart', 'Success');
      
    })
  }

  addProductToWishList(productId: string) {
    this._wishListService.addProductToWishList(productId).subscribe((res)=>{
      console.log(res)
      this.wishList = res.data
      this.toastr.success('Product added to WishList', 'Success');
    })
  }

  removeProductFromWishList(productId: string){
    this._wishListService.removeProductFromWishList(productId).subscribe((res)=>{
      this.wishList = res.data
      this.toastr.success('Product removed from WishList', 'Success');
    })
  }
}
