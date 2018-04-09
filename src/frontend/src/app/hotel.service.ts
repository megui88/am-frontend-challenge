import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import {of} from 'rxjs/observable/of';
import {catchError, map, tap} from 'rxjs/operators';

import {Hotel} from './hotel';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable()
export class HotelService {

    private hotelsUrl = 'http://localhost:3001/hotel';  // URL to web api

    constructor(private http: HttpClient) {
    }

    /** GET hotels from the server */
    getHotels(): Observable<Hotel[]> {
        return this.http.get<Hotel[]>(this.hotelsUrl, httpOptions);
    }

    /** GET hotel by id. Return `undefined` when id not found */
    getHotelNo404<Data>(id: number): Observable<Hotel> {
        const url = `${this.hotelsUrl}/${id}`;
        return this.http.get<Hotel[]>(url)
            .pipe(
                map(hotels => hotels[0]), // returns a {0|1} element array
                tap(h => {
                    const outcome = h ? `fetched` : `did not find`;
                    this.log(`${outcome} hotel id=${id}`);
                }),
                catchError(this.handleError<Hotel>(`getHotel id=${id}`))
            );
    }

    /** GET hotel by id. Will 404 if id not found */
    getHotel(id: number): Observable<Hotel> {
        const url = `${this.hotelsUrl}/${id}`;
        return this.http.get<Hotel>(url, httpOptions);
    }

    /* GET hotels whose name contains search term */
    searchHotels(query: string): Observable<Hotel[]> {
        if (!query.trim()) {
            // if not search term, return empty hotel array.
            return this.getHotels();
        }
        return this.http.get<Hotel[]>(`${this.hotelsUrl}/?${query}`).pipe(
            tap(_ => this.log(`found hotels matching "${query}"`)),
            catchError(this.handleError<Hotel[]>('searchHotels', []))
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
            this.log(`${operation} failed: ${error.message}`);

            // Let the app keep running by returning an empty result.
            return of(result as T);
        };
    }

    private log(message: string) {
        console.log('HotelService: ' + message);
    }
}
