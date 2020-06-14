import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
declare var $: any;


@Injectable({
  providedIn: 'root'

})
export class UplodeFileService {
  private BaseUplodeUrl: string = environment.baseUrl + 'api/Upload/';
  private BaseEmployeeUrl: string = environment.baseUrl + 'api/Employee/';

  constructor(private http: HttpClient) { }

  uploadFileEmployee(file) {
    let baseUrl = this.BaseUplodeUrl + "UploadFile_Item";
    return this.http.post(baseUrl, file).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
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


