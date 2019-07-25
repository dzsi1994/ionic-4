import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.scss'],
})
export class OrderPage implements OnDestroy, OnInit {
  name: any;
  detailsForm: FormGroup;
  @ViewChild('myInput') myInput;

  constructor(public formBuilder: FormBuilder, private navController: NavController) {}
  ngOnInit() {
    this.detailsForm = this.buildForm();
    this.detailsForm.valueChanges.pipe(debounceTime(300)).subscribe(res => this.navigate());
  }
  navigate() {
    const barcode = this.detailsForm.get('barCode').value;
    if (!barcode.barCode) {
      return;
    }
    this.navController.navigateRoot([`order`, barcode.barCode]);
  }
  buildForm(): FormGroup {
    return this.formBuilder.group({
      barCode: ['', Validators.required],
    });
  }
  ngOnDestroy() {}
}
