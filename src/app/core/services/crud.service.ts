import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { CrudOperations } from './../../shared/models/crud-operations.model';

export abstract class CrudService<T> implements CrudOperations<T> {
  url: string;
  token = environment.token;
  constructor(protected http: HttpClient, protected category: string) {
    this.url = `${environment.apiUrL}/${category}/${this.token}/`;
  }

  save(path: string, t: T, options?: object): Observable<T> {
    return this.http.post<T>(`${this.url}/${path}`, t);
  }

  update(path: string, t: T, options?: object): Observable<T> {
    return this.http.put<T>(`${this.url}/${path}`, t);
  }

  get(path: string, options?: object): Observable<T> {
    return this.http.get<T>(`${this.url}/${path}`);
  }

  getAll(options?: object): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  delete(path: string, options?: object): Observable<T> {
    return this.http.delete<T>(`${this.url}/${path}`);
  }
}
