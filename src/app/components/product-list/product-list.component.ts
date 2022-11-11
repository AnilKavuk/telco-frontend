import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products:string[] = ["Laptop","Televizyon","Kulaklık"];

  name:string = '';

  inputForm = new FormGroup({
    name : new FormControl('',[Validators.required]),
  });

  constructor() {

  }

  ngOnInit(): void {
    this.getProducts();
  }

  addProducts(name:string){
    this.products.push(name);
    this.name = '';
  }
  getProducts(){
    return this.products;
  }
  deleteProduct(name:string){
    this.products = this.products.filter(item => item !== name);
  }


}
