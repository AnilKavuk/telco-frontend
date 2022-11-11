import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { Router } from '@angular/router';
import { Service } from 'src/app/models/service';
import { ServicesService } from 'src/app/services/services.service';

@Component({
  selector: 'app-create-services',
  templateUrl: './create-services.component.html',
  styleUrls: ['./create-services.component.css']
})
export class CreateServicesComponent implements OnInit {

  services!: Service[];
  serviceForm!: FormGroup;
  checkedServices!:any;

  constructor(
    private formBuilder:FormBuilder,
    private servicesService:ServicesService,
    private router:Router
    ) {
    this.serviceForm = formBuilder.group({
        selectedServices:  new FormArray([])
       });
  }

  ngOnInit(): void {
    this.getServices();// servisleri sayfa ilk yüklendiğinde çekecek metot
  }

  getServices() { // servisler servicesService classından get isteği ile services verileri alınır...
    this.servicesService.getServices().subscribe((response) => {
      this.services = response;
   })
  }

  onCheckboxChange(event: any) { //listelenen servisler içerisinde ilgili servislerin seçilip seçilmediği işleminin yapıldığı metot

    const selectedServices = (this.serviceForm.controls['selectedServices'] as FormArray);

    if (event.target.checked) {//seçili service arraye push edilir..
      selectedServices.push(new FormControl(event.target.value));
    } else { // seçili service çıkarılırsa arraydan silinir...
      const index = selectedServices.controls
      .findIndex(x => x.value === event.target.value);
      selectedServices.removeAt(index);
    }
  }

  goNextForm(){
    const selectedservices = this.services.filter((service) => { //seçilen servisler, services json içersinden filterelenip selectedservices değişkenine atanıyor..
      return this.serviceForm.value.selectedServices.some((selectedService:any) => {
        return selectedService === service.name;
      });
    })
  console.log(selectedservices);
  this.checkedServices = selectedservices; // ilgili değişkeni globale taşır...

  this.saveServicesStore(this.checkedServices);

  this.router.navigateByUrl('/creation-overview');
  }

  goBackForm(){
    this.router.navigateByUrl('/create-customer');
  }

  saveServicesStore(services:Service){//service form değerleri oluşturulan store'a kayıt edilir..
    this.servicesService.saveServices(services);
    this.servicesService.serviceModel$.subscribe((res) => {
      console.log("services :",res);//store'dan alınan serviceModel
    });
  }
}
