import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';
import { MatDialog } from '@angular/material';

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
    public currentDate: Date;
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
        this.currentDate = new Date();

        this.appService
            .getSlots()
            .subscribe(
                (slots: Slot[]) => {
                    this.slots = slots;
                }
            );
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
    public checkBookedSlot(day: number): BookedSlot[] {
        return this.bookedSlots.filter((bs: BookedSlot) => bs.day === day);
    }

    /*
      get booked slot hours for a day
    */
    public getformattedSlots(day: number) {
        return Object.values([...this.checkBookedSlot(day)].reduce((bookedSlotsBySlotId, bs) => {
            const slot = { ...this.slots.find((slot: Slot) => slot.id == bs.slot_id) };
            if (bookedSlotsBySlotId[slot.id]) {
                bookedSlotsBySlotId[slot.id].hour += slot.hour;
                bookedSlotsBySlotId[slot.id].price += slot.price;
            } else {
                bookedSlotsBySlotId[slot.id] = slot;
            }
            return bookedSlotsBySlotId;
        }, {}));
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
        this.appService
            .getBookedSlots(selected.getMonth(), selected.getFullYear())
            .subscribe(
                (bookedSlots: BookedSlot[]) => {
                    this.bookedSlots = bookedSlots;
                }
            );
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
