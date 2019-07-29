import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CrudService } from '../core/services/crud.service';

@Injectable()
export class OrderService extends CrudService<any> {
  constructor(http: HttpClient) {
    super(http, 'orders.json');
  }
  forgetPassword(object: any): Observable<boolean> {
    return this.http.post<any>(this.url + '/', object);
  }
}
