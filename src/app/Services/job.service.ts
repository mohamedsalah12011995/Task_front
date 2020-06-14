import { Injectable, Inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { Job } from '../Models/Job';

@Injectable()
export class JobService {

  private BaseJobUrl: string = environment.baseUrl + 'api/Job/';

  constructor(private http: HttpClient) {

  }

  getJobs(): Observable<Job[]> {

    let url = this.BaseJobUrl + "GetJobs";

    return this.http.get<Job[]>(url).pipe(
      tap(data => { }),
      catchError(this.handleError)
    );
  }

  InsertOrUpdateJob(Job: Job): Observable<Job> {

    let url = this.BaseJobUrl + "InsertOrUpdateJob"
    //xx= JSON.stringify(custModel);
    return this.http.post<Job>(url, Job).pipe(
      tap(data => {
      }),
      catchError(this.handleError)
    );
  }

  getJobById(id: number): Observable<Job> {
    let url = this.BaseJobUrl + "GetJob"
    const param = new HttpParams()
      .append('id', id.toString())
    let Job = this.http
      .get(url, { params: param }).pipe(
        map((response: Response) => {
          var x: any = response
          return x;
        }));
    return Job;
  }

  removeJob(JobId: number): Observable<Job> {
    let url = this.BaseJobUrl + "RemoveJob"
    console.log(JobId);
    const param = new HttpParams().append('id', JobId.toString())
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
