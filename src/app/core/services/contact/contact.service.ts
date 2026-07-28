import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';

export interface LandingContactPayload {
  name: string;
  email: string;
  topic: string;
  message: string;
  /** Honeypot — must be empty. */
  website?: string;
}

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  constructor(private http: HttpClient) {}

  submit(payload: LandingContactPayload): Observable<void> {
    return this.http
      .post(`${environment.apiBaseUrl}/public/contact`, payload, {
        observe: 'response',
        responseType: 'text'
      })
      .pipe(
        map(() => undefined),
        catchError((err: HttpErrorResponse) => {
          if (err.status === 429) {
            return throwError(() => new Error('RATE_LIMIT'));
          }
          if (err.status === 0) {
            return throwError(() => new Error('NETWORK'));
          }
          return throwError(() => new Error('GENERIC'));
        })
      );
  }
}
