import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NavController } from '@ionic/angular';

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
    this.buildForm();
  }
  navigate(barcode: any) {
    if (!barcode.barCode) {
      return;
    }
    this.navController.navigateRoot([`order`, barcode.barCode]);
  }
  buildForm() {
    this.detailsForm = this.formBuilder.group({
      barCode: ['', Validators.required],
    });
    this.detailsForm.valueChanges.pipe(debounceTime(300)).subscribe(res => this.navigate(res));
  }
  ngOnDestroy() {}
}
