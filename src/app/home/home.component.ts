import { Component, OnInit } from '@angular/core';

import { getDaysForCurrentMonth, getTodayDate } from '../utils';
import { Router } from '@angular/router';

import { AppService } from '../app.service';

import { Slot } from '../interfaces/slots';
import { BookedSlot } from '../interfaces/bookedSlots';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public days: number[] = getDaysForCurrentMonth();
    public today: number = getTodayDate();

    slots: Slot[] = [];
    bookedSlots: BookedSlot[] = [];

    constructor(
        private router: Router,
        private appService: AppService
    ) { }

    public ngOnInit(): void {

        this.appService
            .getBookedSlots()
            .subscribe(
                (bookedSlots) => {
                    this.bookedSlots = bookedSlots;
                }
            );

        this.appService
            .getSlots()
            .subscribe(
                (slots) => {
                    this.slots = slots;
                }
            );
    }

    public handleGridClick(date: number): void {
        this.router.navigate(['book-slot']);
    }

    public getbookedSlot(day) {
        const formattedSlots = [];
        //return this.bookedSlots.filter(slot => slot.day === day) || [];
        const filteredBookedSlots = this.bookedSlots.filter(slot => slot.day === day) || [];

        if(filteredBookedSlots) {
          filteredBookedSlots.forEach((bookedSlot) => {
              let slot = this.slots.find(s => s.id === bookedSlot.slot_id);
              if(slot && slot.id) {
                if(formattedSlots[slot.id]) {
                  formattedSlots[slot.id].hour += slot.hour;
                } else {
                  formattedSlots[slot.id] = {};
                  formattedSlots[slot.id].hour = slot.hour;
                  formattedSlots[slot.id].name = slot.name;
                  formattedSlots[slot.id].price = slot.price;
                }
              }


          });
        }
        console.log(formattedSlots);
        return formattedSlots;
    }

}
