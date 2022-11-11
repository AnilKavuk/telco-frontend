import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl,FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/category';
import { CategoriesService } from 'src/app/services/categories.service';

@Component({
  selector: 'app-listview',
  templateUrl: './listview.component.html',
  styleUrls: ['./listview.component.css']
})
export class ListviewComponent implements OnInit {

  // ?: null olabilir demek.
  // !: null olmayacak, bu property'i kullanmadan önce atama işlemini gerçekleştiriceğiz söz vermiş oluyoruz.
  categories !: Category[];

  categoryIdToDelete !:number;

  categoryIdToUpdate !:number;

  categoryAddForm!:FormGroup;

  error!:string;

  formTitle:string = "Forms - Add";
  formButton:string = "Add";

  constructor(private categoriesService:CategoriesService, private formBuilder:FormBuilder) {}

  ngOnInit(): void {
    this.getCategories();
    this.createCategoryAddForm();
  }

  createCategoryAddForm() {
    this.categoryAddForm = this.formBuilder.group({
      name: ["",Validators.required],
      description: ["",[Validators.required,Validators.minLength(10)]],
    });
  }

  getCategories() {
    // Object tipi henüz belli olmayan referans tip diyebiliriz. Referans tiplerin en temel sınıfı diyebiliriz.
    this.categoriesService.getCategories().subscribe((response) => { //Observer design pattern
      this.categories = response;
    });
  }

  addOrUpdateCategory(){

    if(this.categoryAddForm.invalid){
      this.error = "Form is invalid";
      return;
    }else{
      this.error = "";
    }

    if(this.formButton === "Add"){
      //const {name , description} = this.categoryAddForm.value;
      const addCategory: Category = {
        ...this.categoryAddForm.value
      };
      this.categoriesService.add(addCategory).subscribe({
        next: (res) => {
          console.log(`Category (${res.id}) added`);
        },
        error: (err) => {
          console.log(err);
          this.error = err.message;
        },
        complete: () => {
          this.getCategories();
          this.categoryAddForm.reset();
        }
      });
    }else{
      const updateCategory: Category = {
        id: this.categoryIdToUpdate,
        name: this.categoryAddForm.get('name')?.value,
        description: this.categoryAddForm.get('description')?.value
      };

      this.categoriesService.update(updateCategory).subscribe({
        next: (res) => {
          console.log(`Category (${res.id}) updated`);
        },
        error: (err) => {
          console.log(err);
          this.error = err.message;
        },
        complete: () => {
          this.getCategories();
          this.categoryAddForm.reset();
          this.formTitle = "Forms - Add";
          this.formButton = "Add";
        }
      });
    }
  }

  delete(){
    this.categoriesService.delete(this.categoryIdToDelete).subscribe({
      next: () => {
        console.log(`Category (${this.categoryIdToDelete}) deleted`);
      },
      error: (err) => {
        console.log("Hataaa: "+ err.message);
      },
      complete: () => {
        this.categoryIdToDelete = 0;
        this.getCategories();
      }
    });
  }

  editCategory(category:Category){

    this.formTitle = `Forms - Update ${category.id}`;
    this.formButton = "Update";

    this.categoryIdToUpdate = category.id;

    this.categoryAddForm.patchValue({
      name: category.name,
      description: category.description,
    });
  }

}
