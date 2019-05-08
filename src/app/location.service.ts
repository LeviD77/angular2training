import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

import { Location } from './location';
import { of, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LocationService {

  private baseUrl = 'http://localhost:8080/';

  private httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient
  ) { }

  /**
   * Location index function
   */
  getLocations(): Observable<Location[]> {
    return this.http.get<Location[]>(`${this.baseUrl}/api/locations`)
                    .pipe(
                      map(
                        data => (data as any).locations
                      ),
                      catchError(this.handleError<Location[]>('getLocations', []))
                    );
  }

  /**
   * Location show function
   * Gets location by ID
   */
  getLocation(id: number): Observable<Location> {
    console.log(`${this.baseUrl}/api/locations/${id}`);
    return this.http.get<Location>(`${this.baseUrl}/api/locations/${id}`)
                    .pipe(
                      catchError(this.handleError<Location>('getLocation'))
                    );
  }

  updateLocation(id: number, location: Location): Observable<Location>{
    return this.http.post<Location>(
                      `${this.baseUrl}/api/locations/${id}`,
                      {
                        name: location.name,
                        coords: `${location.lat},${location.lon}`
                      },
                      this.httpOptions
                    )
                    .pipe(
                      catchError(this.handleError<Location>('updateLocation'))
                    );
  }

  createLocation(location: Location): Observable<Location> {
    return this.http.post<Location>(
      `${this.baseUrl}/api/locations`,
      {
        name: location.name,
        coords: `${location.lat},${location.lon}`
      },
      this.httpOptions
    )
      .pipe(
        catchError(this.handleError<Location>('createLocation'))
      );
  }

  deleteLocation(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/api/locations/${id}`,)
      .pipe(
        catchError(this.handleError<number>('deleteLocation'))
      );
  }

  /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.error(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
