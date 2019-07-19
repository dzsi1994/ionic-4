import { Component, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-order',
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.scss'],
})
export class OrderPage implements OnDestroy {
  name: any;
  detailsForm: FormGroup;
  @ViewChild('myInput') myInput;

  constructor(private router: Router, public formBuilder: FormBuilder) {
    this.buildForm();
  }
  navigate(barcode: any) {
    if (!barcode.barCode) {
      return;
    }
    this.router.navigate([`order`, barcode.barCode]);
  }
  buildForm() {
    this.detailsForm = this.formBuilder.group({
      barCode: ['', Validators.required],
    });
    this.detailsForm.valueChanges.pipe(debounceTime(300)).subscribe(res => this.navigate(res));
  }
  ngOnDestroy() {
    console.log('OrderPage destroyed');
  }
}
