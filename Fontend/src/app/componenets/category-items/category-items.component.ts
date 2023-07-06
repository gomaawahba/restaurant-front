import {Component, OnInit} from '@angular/core';
import {CategoryServiceService} from "../../service/category-service.service";
import {Category} from "../../model/category";

@Component({
  selector: 'app-category-items',
  templateUrl: './category-items.component.html',
  styleUrls: ['./category-items.component.css']
})
export class CategoryItemsComponent implements OnInit{
  categories:Category[]=[];
  ngOnInit(): void {
    this.getAllCategories();
  }
  constructor(private categoryService:CategoryServiceService) {
  }
  getAllCategories(){
    this.categoryService.getAllCategories().subscribe(
      data=>{
        this.categories=data;
      }
    )
  }

}
