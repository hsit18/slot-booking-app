import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import { Observable } from 'rxjs/Rx';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HomeService {
  baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) { }

  // Load all github users
  getSlots() {
    return this.http.get(`${this.baseUrl}/slots`)
      .map(res => res.json());
  }

};
