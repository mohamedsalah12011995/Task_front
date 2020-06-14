import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Department } from '../Models/Department';

@Injectable()
export class DepartmentService {

  private BaseDepartmentUrl: string = environment.baseUrl + 'api/Department/';

  constructor(private http: HttpClient) {

  }

  getDepartments(): Observable<Department[]> {

    let url = this.BaseDepartmentUrl + "GetDepartments";

    return this.http.get<Department[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateDepartment(Department: Department): Observable<Department> {

    let url = this.BaseDepartmentUrl + "InsertOrUpdateDepartment"
    //xx= JSON.stringify(custModel);
    return this.http.post<Department>(url, Department).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  getDepartmentById(id: number): Observable<Department> {
    let url = this.BaseDepartmentUrl + "GetDepartment"
    const param = new HttpParams()
      .append('id', id.toString())
    let Department = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return Department;
  }

  removeDepartment(DepartmentId: number): Observable<Department> {
    let url = this.BaseDepartmentUrl + "RemoveDepartment"
    console.log(DepartmentId);
    const param = new HttpParams().append('id', DepartmentId.toString())
    return this.http.delete(url, { params: param }).pipe(
      map((response: Response) => {
        var x: any = response
        return x;
      }));
  }

  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = '';
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

}
