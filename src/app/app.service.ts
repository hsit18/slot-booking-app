import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from '@angular/http';

import { Slot } from './interfaces/slots';
import { BookedSlot } from './interfaces/bookedSlots';

@Injectable()
export class AppService {

    private baseUrl = 'http://localhost:3001';

    /*
      AppService constructor
    */
    constructor(private http: Http) { }

    /*
      API to get slots
    */
    public getSlots(): Observable<Slot[]> {
        return this.http
            .get(`${this.baseUrl}/slots`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    /*
      API to get booked slots
    */
    public getBookedSlots(month?: number, year?: number): Observable<BookedSlot[]> {
        let data = {month, year};
        return this.http
            .get(`${this.baseUrl}/bookedSlots`, {params: data})
            .map(response => response.json())
            .catch(this.handleError);
    }

    /*
      API to save book slot
    */
    public bookSlot(slotObj: any): Observable<any> {
        console.log(slotObj);
        const head = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: head });
        return this.http
        .post(`${this.baseUrl}/bookedSlots`, JSON.stringify(slotObj), options)
        .map(response => response.json())
        .catch(this.handleError);
    }

    /*
      function to handler API error
    */
    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }
}
