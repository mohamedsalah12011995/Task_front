import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Employee } from '../Models/Employee';

@Injectable()
export class EmployeeService {

  private BaseEmployeeUrl: string = environment.baseUrl + 'api/Employee/';

  constructor(private http: HttpClient) {

  }

  getEmployees(): Observable<Employee[]> {

    let url = this.BaseEmployeeUrl + "GetEmployees";

    return this.http.get<Employee[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateEmployee(Employee: Employee): Observable<Employee> {

    let url = this.BaseEmployeeUrl + "InsertOrUpdateEmployee"
    //xx= JSON.stringify(custModel);
    return this.http.post<Employee>(url, Employee).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }


  getEmployeeById(id: number): Observable<Employee> {
    let url = this.BaseEmployeeUrl + "GetEmployee"
    const param = new HttpParams().append('id', id.toString())

    return this.http.get<Employee>(url, { params: param }).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }



  removeEmployee(EmployeeId: number): Observable<Employee> {
    let url = this.BaseEmployeeUrl + "RemoveEmployee"
    console.log(EmployeeId);
    const param = new HttpParams().append('id', EmployeeId.toString())
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
