import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';
import { Store } from '@ngrx/store';

import { debounceTime } from 'rxjs/operators';

import { State } from './../store/index';
import { setBarCode } from '../store/action';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-order',
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.scss'],
})
export class OrderPage implements OnDestroy, OnInit {
  name: any;
  detailsForm: FormGroup;
  @ViewChild('barCodeInput') barCodeInput;

  constructor(public formBuilder: FormBuilder, private navController: NavController, public store: Store<State>) {}
  ngOnInit() {
    this.buildForm();
    setTimeout(() => {
      this.barCodeInput.setFocus();
    }, 500);
  }
  navigate() {
    const barcode = this.detailsForm.get('barCode').value;
    if (!barcode) {
      return;
    }
    this.store.dispatch(setBarCode({ barCode: barcode }));
    this.navController.navigateRoot([`order`, barcode]);
  }
  buildForm() {
    this.detailsForm = this.formBuilder.group({
      barCode: ['', Validators.required],
    });
    this.detailsForm.valueChanges
      .pipe(
        untilDestroyed(this),
        debounceTime(1000),
      )
      .subscribe(_ => this.navigate());
  }
  ngOnDestroy() {}
}
