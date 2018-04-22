import { Component, OnInit } from '@angular/core';

import { getDaysForCurrentMonth, getTodayDate } from '../utils';
import { Router } from '@angular/router';

import { AppService } from '../app.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public days: number[] = getDaysForCurrentMonth();
    public today: number = getTodayDate();

    constructor(
        private router: Router,
        private appService: AppService
    ) { }

    public ngOnInit(): void {
        // console.log(this.today);

        this.appService
          .getSlots()
          .subscribe(
            (slots) => {
              console.log(slots);
              //this.slots = slots;
            }
          );
    }

    public handleGridClick(date: number): void {
        if(date >= this.today) {
            this.router.navigate(['day-view']);
        }
    }

}
