import { Component, OnInit } from '@angular/core';
import { CategoriesService } from 'src/app/Services/categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  constructor(private _CategoriesService:CategoriesService){}

  categoriesList: any[] = []
  ngOnInit(): void {
    this._CategoriesService.getAllCategories().subscribe({
      next : (res) => {
        console.log(res.data)
        this.categoriesList = res.data
      },
      error: (err) =>{
        console.log(err)
      }
    })
  }
}






