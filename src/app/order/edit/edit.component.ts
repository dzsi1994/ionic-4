import { State } from './../../store/index';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { selectPackage } from 'src/app/store/reducers/global.reducer';
import { untilDestroyed } from 'ngx-take-until-destroy';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit, OnDestroy {
  package: any;
  constructor(public store: Store<State>) {}

  ngOnInit() {
    this.store
      .select(selectPackage)
      .pipe(untilDestroyed(this))
      .subscribe(res => {
        this.package = res;
      });
  }
  ngOnDestroy() {}
}
