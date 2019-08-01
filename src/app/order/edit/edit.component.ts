import { OrderService } from './../order.service';
import { State } from './../../store/index';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectPackage } from 'src/app/store/reducers/global.reducer';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { setActivePackage } from 'src/app/store/action';
import { Actions } from './item/item.component';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  package: any = {};
  packageId: string;
  text = '';
  barcode = '';
  errors: any[] = [];
  constructor(public store: Store<State>, private orderService: OrderService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.packageId = this.route.snapshot.paramMap.get('orderId');
    this.store
      .select(selectPackage)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.package = res;
      });
  }
  update(item) {
    if (item.type === Actions.edit) {
      this.updateQuantity(item.data);
    } else if (item.type === Actions.add) {
      this.addNewToPackage(item.data);
    }
  }
  updateQuantity(data: any) {
    const body = {};
    this.orderService
      .update(`detail/${this.packageId}/${data.barcode}/${data.quantity}`, body)
      .pipe(
        tap(_ => {
          this.errors = _.Errores;
          this.store.dispatch(setActivePackage({ selectedPackage: _.Data }));
        }),
      )
      .subscribe(res => {});
  }
  addNewToPackage(data: any) {
    const body = {};
    this.orderService
      .save(`detail/${this.packageId}/${data.barcode}/${data.quantity}`, body)
      .pipe(
        tap(_ => {
          this.errors = _.Errores;
          this.store.dispatch(setActivePackage({ selectedPackage: _.Data }));
        }),
      )
      .subscribe(res => {});
  }
  ngOnDestroy() {}
}
