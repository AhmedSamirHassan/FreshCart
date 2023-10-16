import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  products: any[] = []
  caregories: any[] = []
  customOptions: OwlOptions = {
    autoplay: true,
    lazyLoad: true,
    smartSpeed: 1000,
    autoplayTimeout: 3000,
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
  constructor(private _ProductsService : ProductsService) {
  }

  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe((res)=>{
      this.products = res.data
    })
    this._ProductsService.getAllCategories().subscribe((Res)=>{
      this.caregories = Res.data
    })
  }
  CategoryOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 5
      }
    },
    nav: true
  }
}
