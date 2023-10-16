import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/Services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/Services/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})



export class ProductDetailsComponent {
  productId: string = ''
  productDetails:any
  numOfCartItems:number = 0
  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      }
    },
    nav: true
  }

  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductsService:ProductsService, private _CartService:CartService, private toastr: ToastrService){
    _ActivatedRoute.paramMap.subscribe((params)=>{
      this.productId = params.get('id') || ''
      _ProductsService.getProductDetails(this.productId).subscribe((product)=>{
        console.log(product)
        this.productDetails = product.data
      })
    })
  }

  addProductToCart(){
    this._CartService.addProductToCart(this.productId).subscribe((res)=>{
      this._CartService.numOfCartItems.next(res.numOfCartItems)
      this.toastr.success('Product added to Cart', 'Success');
    })
  }

}
