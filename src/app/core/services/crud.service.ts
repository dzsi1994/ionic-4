import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

import { environment } from './../../../environments/environment';
import { CrudOperations } from './../../shared/models/crud-operations.model';

export abstract class CrudService<T> implements CrudOperations<T> {
  url: string;
  token = environment.token;
  constructor(protected http: HttpClient, protected category: string) {
    this.url = `${environment.apiUrL}/${category}`;
  }

  save(t: T, options?: object): Observable<T> {
    return this.http.post<T>(this.url, t);
  }

  update(path: string, t: T, options?: object): Observable<T> {
    return this.http.put<T>(`${this.url}/${this.token}/${path}`, t);
  }

  get(path: string, options?: object): Observable<T> {
    return this.http.get<T>(`${this.url}/${this.token}/${path}`);
  }

  getAll(options?: object): Observable<T[]> {
    return this.http.get<T[]>(this.url);
  }

  delete(path: string, options?: object): Observable<T> {
    return this.http.delete<T>(`${this.url}/${this.token}/${path}`);
  }
}
