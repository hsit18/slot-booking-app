import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import {MatDialog} from '@angular/material';

import { getDaysForCurrentMonth, getTodayDate, arrayGroupByProp, getMonth } from '../utils';

import { AppService } from '../app.service';

import { ViewBookedSlotsComponent } from '../view-booked-slots/view-booked-slots.component';

import { Slot } from '../interfaces/slots';
import { BookedSlot } from '../interfaces/bookedSlots';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
    public days: number[] = getDaysForCurrentMonth();
    public today: number = getTodayDate();
    public currentDate: Date = new Date();
    public getMonthStr = getMonth;
    public currentMonth: number = new Date().getMonth();

    private slots: Slot[] = [];
    private bookedSlots: BookedSlot[] = [];
    private dataSub: Subscription;

    /*
      HomeComponent constructor
    */
    constructor(
        public dialog: MatDialog,
        private router: Router,
        private appService: AppService
    ) { }

    /*
      ngOnInit lifecycle method to initialize the calendar view
    */
    public ngOnInit(): void {
        this.initMonthView();
    }

    /*
      ngOnDestroy lifecycle method to unsubscribe data
    */
    public ngOnDestroy(): void {
        if (this.dataSub) {
            this.dataSub.unsubscribe();
        }
    }

    /*
      Getter to get current months
    */
    public get activeMonth(): number {
        return this.currentDate.getMonth();
    }

    /*
      Getter to get current Year
    */
    public get activeYear(): number {
        return this.currentDate.getFullYear();
    }

    /*
      Getter to get previous months
    */
    public get prevMonth(): number {
        return (this.currentDate.getMonth() > 0) ? this.currentDate.getMonth() - 1 : 0;
    }

    /*
      Getter to get next months
    */
    public get nextMonth(): number {
        return (this.currentDate.getMonth() < 11) ? this.currentDate.getMonth() + 1 : 0;
    }

    /*
      book slot click handler to route to book slot page
    */
    public bookSlotClickHandler(date: number): void {
        this.router.navigate([`book-slot/${new Date(this.currentDate.setDate(date)).getTime()}`]);
    }

    /*
      get booked slot hours for a day
    */
    public getBookedSlotHours(day: number) {
        const slots: BookedSlot[] = this.bookedSlots.filter((bs: BookedSlot) => bs.day === day);
        const slotsById = Object.entries(arrayGroupByProp(slots, 'slot_id'));
        slotsById.map((sl) => {
            sl.push(this.calculateSlotHours(sl[1]));
        });
        return slotsById;
    }

    /*
      get slot name by slot Id
    */
    public getSlotName(slotId: number): string {
        return this.slots.find((slot: Slot) => slot.id == slotId).name;
    }

    /*
      change month handler of calendar view
    */
    public changeMonthHandler(action: string): void {
        switch (action) {
            case 'next':
                this.currentDate.setMonth(this.currentDate.getMonth() + 1);
                break;
            case 'prev':
                this.currentDate.setMonth(this.currentDate.getMonth() - 1);
                break;
            default:
                break;
        }
        this.initMonthView(this.currentDate);
        this.days = getDaysForCurrentMonth(this.currentDate);
        this.today = getTodayDate(this.currentDate);
    }

    /*
      initialize current month calendar view
    */
    private initMonthView(selected: Date = new Date()) {
        this.dataSub = Observable.combineLatest(
            this.appService.getBookedSlots(),
            this.appService.getSlots()
        )
        .subscribe((res: [BookedSlot[], Slot[]]) => {
            [this.bookedSlots, this.slots] = res;
            console.log(this.bookedSlots);
            this.bookedSlots = this.bookedSlots.filter((bs: BookedSlot) => bs.year === selected.getFullYear() && bs.month === selected.getMonth());
        });
    }

    /*
      calculate total hours for a slot of a day
    */
    private calculateSlotHours(slots): number {
        return slots.reduce((hrs: number, slot: BookedSlot) => {
            slot.slot_id == 6 ? (hrs = hrs+2) : hrs++;
            return hrs;
        }, 0);
    }

    /*
      view list of booked slots for a day
    */
    public viewBookedSlots(day): void {
      this.dialog.open(ViewBookedSlotsComponent, {
        width: '500px',
        data: {
          day: day,
          currentDate: this.currentDate,
          slots: this.slots,
          bookedSlots: this.bookedSlots.filter((bs: BookedSlot) => bs.day === parseInt(day, 10))
        }
      });
    }
}
