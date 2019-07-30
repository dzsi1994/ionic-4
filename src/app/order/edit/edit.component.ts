import { OrderService } from './../order.service';
import { State } from './../../store/index';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPackage } from 'src/app/store/reducers/global.reducer';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { setActivePackage } from 'src/app/store/action';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  package: any = {};
  packageId: string;
  text = '';
  private quantity: any = {};
  barcode = '';
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
    const body = {};
    this.orderService
      .update(`detail/${this.packageId}/${item.barcode}/${item.quantity}`, body)
      .pipe(
        tap(_ => {
          this.store.dispatch(setActivePackage({ selectedPackage: _.Data }));
        }),
      )
      .subscribe(res => {});
  }
  change(ev) {
    this.quantity.quantity = null;
    this.quantity = {
      quantity: parseInt(ev.value, 10),
    };
  }
  ngOnDestroy() {}
}
