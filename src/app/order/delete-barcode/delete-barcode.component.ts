import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { State } from 'src/app/store';
import { OrderService } from '../order.service';
import { ActivatedRoute } from '@angular/router';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { selectPackage } from 'src/app/store/reducers/global.reducer';
import { tap } from 'rxjs/operators';
import { setActivePackage } from 'src/app/store/action';

@Component({
  selector: 'app-delete-barcode',
  templateUrl: './delete-barcode.component.html',
  styleUrls: ['./delete-barcode.component.scss'],
})
export class DeleteBarcodeComponent implements OnInit, OnDestroy {
  package: any = {};
  packageId: string;
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
  update(data: any) {
    this.deleteAll(data);
  }
  deleteAll(data: any) {
    const url =
      data.quantity === ''
        ? `partial/${this.packageId}/${data.barcode}`
        : `partial/${this.packageId}/${data.barcode}/${data.quantity}`;
    this.orderService
      .delete(`${url}`)
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
