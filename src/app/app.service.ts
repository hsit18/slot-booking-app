import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { Http, Response, RequestOptions, Headers } from '@angular/http';
import { Slot } from './interfaces/slots';
import { BookedSlot } from './interfaces/bookedSlots';

@Injectable()
export class AppService {

    baseUrl = 'http://localhost:3001';

    constructor(private http: Http) { }

    public getSlots(): Observable<Slot[]> {
        return this.http
            .get(`${this.baseUrl}/slots`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    public getBookedSlots(): Observable<BookedSlot[]> {
        return this.http
            .get(`${this.baseUrl}/bookedSlots`)
            .map(response => response.json())
            .catch(this.handleError);
    }

    public bookSlot(slotObj: any): Observable<any> {
        console.log(slotObj);
        const head = new Headers({ 'Content-Type': 'application/json' });
        const options = new RequestOptions({ headers: head });
        return this.http
        .post(`${this.baseUrl}/bookedSlots`, JSON.stringify(slotObj), options)
        .map(response => response.json())
        .catch(this.handleError);
    }

    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }

}
