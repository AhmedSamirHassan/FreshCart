import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/Services/cart.service';
import { WishListService } from 'src/app/Services/wish-list.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {

  constructor(private _wishListService:WishListService, private _CartService:CartService, private toastr: ToastrService){}
  ngOnInit(): void {
    this.getAllProductsOfWishList()
  }

  productId : string = ''
  wishListProducts: any[] = []
  wishList:string[]=[]
  isLoading: boolean = false
  errorMessage: string = ''
  getAllProductsOfWishList(){
    this.isLoading = true
    this._wishListService.getAllProductsOfWishList().subscribe({
      next: (res)=>{
        this.isLoading = false
        this.wishListProducts = res.data
      }, error:(err)=>{
        this.isLoading = false
        this.errorMessage = err.error.message
      }
    })
  }

  removeProductFromWishList(productId:string) {
    this._wishListService.removeProductFromWishList(productId).subscribe({
      next:(res)=>{
        this._wishListService.numOfWishListItems.next(res.data.length)
        this.wishListProducts = this.wishListProducts.filter(Product=>{
        return productId != Product._id
        })

      },
      error: (err)=>{
        console.log(err)
      }
    })
  }

  addProductToCart(productId:string){
    console.log(productId)
  this._CartService.addProductToCart(productId).subscribe({
    next: (res)=>{
      console.log(res)
      this._CartService.numOfCartItems.next(res.numOfCartItems)
      this.toastr.success('Product added to Cart', 'Success');
    },
    error: (err)=>{
      console.log(err.error.message)
    }
  })
  }
}
