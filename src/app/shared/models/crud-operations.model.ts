import { Observable } from 'rxjs';

export interface CrudOperations<T> {
  save(id: string, t: T): Observable<T>;
  update(id: string, t: T): Observable<T>;
  get(id: string): Observable<T>;
  getAll(): Observable<T[]>;
  delete(id: string): Observable<any>;
}
