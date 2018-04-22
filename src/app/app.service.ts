import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { Http, Response } from '@angular/http';
import { Slot } from './interfaces/slots';

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

    private handleError(error: Response | any) {
        console.error('ApiService::handleError', error);
        return Observable.throw(error);
    }

}
