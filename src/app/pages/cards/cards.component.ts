import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { LoadingService } from 'src/app/services/loading.service';
import { Service } from 'src/app/models/service';
import { ServicesService } from 'src/app/services/services.service';
import { ToastrMessageService } from 'src/app/services/toastr-message.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css'],
})
export class CardsComponent implements OnInit {
  editName!: string;
  services!: Service[];
  isEdit: boolean = false;
  editID!: number;
  error!: string;
  serviceAddForm!: FormGroup;
  isLoading!: boolean;

  constructor(
    private servicesService: ServicesService,
    private formBuilder: FormBuilder,
    private loadingService: LoadingService,
    private toastrService:ToastrMessageService
  ) {}

  ngOnInit(): void {
    this.isPageLoading();
    this.loading();
    this.createServiceAddForm();
    this.getServices();
  }

  getServices() {
    // Object tipi henüz belli olmayan referans tip diyebiliriz. Referans tiplerin en temel sınıfı diyebiliriz.
    setTimeout(() => {
      this.servicesService.getServices().subscribe((response) => {
        //Observer design pattern
        this.services = response;
      });
    }, 500);
  }

  edit(service: Service) {
    this.isEdit = true;
    this.editID = service.id;
    this.editName = service.name;
  }
  update() {
    const updateService: Service = {
      id: this.editID,
      name: this.editName,
    };

    this.servicesService.update(updateService).subscribe({
      next: (res) => {
        console.log(`Service (${res.id}) updated`);
      },
      error: (err) => {
        console.log(err);
        this.error = err.message;
      },
      complete: () => {
        this.getServices();
        this.isEdit = false;
      },
    });
  }

  delete(id: number) {
    if (confirm("Are you sure?") == true){
    this.servicesService.delete(id).subscribe({
      next: () => {

      },
      error: (err) => {
        console.log('Hataaa: ' + err.message);
      },
      complete: () => {
        this.toastrService.success(`(${id}) id'li servis başarılı bir şekilde silindi...`);
        this.getServices();
      },
    });
  }else {
    this.toastrService.info(`İşlem iptal edildi...`,"Sistem Mesajı");
  }
  }
  createServiceAddForm() {
    this.serviceAddForm = this.formBuilder.group({
      name: ['', Validators.required],
    });
  }

  add() {
    if (this.serviceAddForm.invalid) {
      this.error = 'Form is invalid';
      return;
    } else {
      this.error = '';
    }
    const addService: Service = {
      ...this.serviceAddForm.value,
    };
    console.log(this.serviceAddForm.value);

    this.servicesService.add(addService).subscribe({
      next: (res) => {
        console.log(`Category (${res.id}) added`);
      },
      error: (err) => {
        console.log(err);
        this.error = err.message;
      },
      complete: () => {
        this.getServices();
        this.serviceAddForm.reset();
      },
    });
  }

  isPageLoading() {
    this.loadingService.isLoadingSubject.subscribe((isLoading) => {
      console.log(isLoading);
      this.isLoading = isLoading;
    });
  }

  loading() {
    if (this.services) {
      this.loadingService.stopLoading();
    } else {
      this.loadingService.startLoading();
    }
  }
}
