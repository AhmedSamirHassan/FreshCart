import { Component, OnInit } from '@angular/core';
import { BrandService } from 'src/app/Services/brand.service';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.css']
})
export class BrandComponent implements OnInit {

  constructor(private _BrandServices: BrandService){

  }

  brandsList: any[] = []
  ngOnInit(): void {
    this._BrandServices.getAllBrands().subscribe({
      next : (res) => {
        console.log(res.data)
        this.brandsList = res.data
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }

}
