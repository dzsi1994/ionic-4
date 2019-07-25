import { Component, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from '@ionic/angular';

import { debounceTime } from 'rxjs/operators';

import { Store } from '@ngrx/store';
import { State } from './../store/index';
import { loadingSetTrue, loadingSetFalse } from '../store/action';
import { Observable } from 'rxjs';
import { selectIsLoading } from '../store/reducers/global.reducer';

@Component({
  selector: 'app-order',
  templateUrl: 'order.component.html',
  styleUrls: ['order.component.scss'],
})
export class OrderPage implements OnDestroy, OnInit {
  loading$: boolean;
  name: any;
  detailsForm: FormGroup;
  @ViewChild('myInput') myInput;

  constructor(public formBuilder: FormBuilder, private navController: NavController, public store: Store<State>) {}
  ngOnInit() {
    this.store
      .select(selectIsLoading)
      .pipe()
      .subscribe(res => {
        this.loading$ = res;
      });
    this.detailsForm = this.buildForm();
    this.detailsForm.valueChanges.pipe(debounceTime(300)).subscribe(res => this.navigate());
  }
  navigate() {
    const barcode = this.detailsForm.get('barCode').value;
    if (!barcode) {
      return;
    }
    this.navController.navigateRoot([`order`, barcode]);
  }
  buildForm(): FormGroup {
    return this.formBuilder.group({
      barCode: ['', Validators.required],
    });
  }
  loadingTrue(loading: boolean) {
    this.store.dispatch(loadingSetTrue({ loading }));
  }
  loadingFalse(loading: boolean) {
    this.store.dispatch(loadingSetFalse({ loading }));
  }
  ngOnDestroy() {}
}
