import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { OrderService } from './../order.service';
import { NavController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-publish',
  templateUrl: 'publish.html',
  styleUrls: ['publish.scss'],
})
export class PublishPage implements OnInit {
  id: string;
  items: any[] = [];
  loading = false;
  detailsForm: FormGroup;
  @ViewChild('locationInput') locationInput;
  constructor(
    private route: ActivatedRoute,
    private navController: NavController,
    private orderService: OrderService,
    private formBuilder: FormBuilder,
    public toastController: ToastController,
  ) {}

  ngOnInit() {
    this.detailsForm = this.buildForm();
    this.id = this.route.snapshot.paramMap.get('orderId');
    if (this.id) {
      this.detailsForm.patchValue({
        Barcode: this.id,
      });
    }
    setTimeout(() => {
      this.locationInput.setFocus();
    }, 500);
  }
  async presentToast() {
    const toast = await this.toastController.create({
      message: 'Your settings have been saved.',
      duration: 2000,
    });
    toast.present();
  }
  buildForm(): FormGroup {
    return this.formBuilder.group({
      Barcode: [{ value: '', disabled: true }, Validators.required],
      location: ['', Validators.required],
    });
  }
  onSubmit() {
    const location = {
      location: this.detailsForm.value.location,
    };
    this.orderService.update(`location/${this.id}`, location).subscribe(res => {
      if (res.Correcto) {
        this.presentToast();
        setTimeout(() => {
          this.navController.navigateRoot(`order/${this.id}`);
        }, 1500);
      }
    });
  }
}
