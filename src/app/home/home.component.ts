import { Component, OnInit } from '@angular/core';

import { getDaysForCurrentMonth, getTodayDate } from '../utils';
import { Router } from '@angular/router';

import { AppService } from '../app.service';

import { Slot } from '../interfaces/slots';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public days: number[] = getDaysForCurrentMonth();
    public today: number = getTodayDate();

    slots: Slot[] = [];
    bookedSlots = [];
    constructor(
        private router: Router,
        private appService: AppService
    ) { }

    public ngOnInit(): void {
        this.bookedSlots = [
            {
              "title": "test title",
              "slot_id": 1,
              "day":22,
              "month": 4,
              "year": 2018,
              "startTime": "12:30",
              "endTime": "13:30",
              "comments": "test description"
            }
        ];

        this.appService
            .getSlots()
            .subscribe(
                (slots) => {
                    console.log(slots);
                    this.slots = slots;
                }
            );
    }

    public handleGridClick(date: number): void {
        this.router.navigate(['book-slot']);
    }

    public getbookedSlot(day) {
        return this.bookedSlots.filter(slot => slot.day === day) || [];
    }

}
