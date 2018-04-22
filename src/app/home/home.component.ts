import { Component, OnInit, OnDestroy } from '@angular/core';

import { getDaysForCurrentMonth, getTodayDate, arrayGroupByProp, getMonth } from '../utils';
import { Router } from '@angular/router';

import { AppService } from '../app.service';

import { Slot } from '../interfaces/slots';
import { BookedSlot } from '../interfaces/bookedSlots';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

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

    constructor(
        private router: Router,
        private appService: AppService
    ) { }

    public ngOnInit(): void {
        this.initMonthView();
    }

    public get activeMonth(): number {
        return this.currentDate.getMonth();
    }

    public get prevMonth(): number {
        return this.currentDate.getMonth() - 1;
    }

    public get nextMonth(): number {
        return this.currentDate.getMonth() + 1;
    }

    public handleGridClick(date: number): void {
        this.router.navigate(['book-slot']);
    }

    public getBookedSlotHours(day: number) {
        const slots: BookedSlot[] = this.bookedSlots.filter((bs: BookedSlot) => bs.day === day);
        const slotsById = Object.entries(arrayGroupByProp(slots, 'slot_id'));
        slotsById.map((sl) => {
            sl.push(this.calculateSlotHours(sl[1]));
        });
        return slotsById;
    }

    public getSlotName(slotId: number): string {
        return this.slots.find((slot: Slot) => slot.id == slotId).name;
    }

    public changeMonth(dir: string): void {
        switch (dir) {
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

    public ngOnDestroy(): void {
        if (this.dataSub) {
            this.dataSub.unsubscribe();
        }
    }

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

    private calculateSlotHours(slots): number {
        return slots.reduce((hrs: number, slot: BookedSlot) => {
            slot.slot_id == 6 ? (hrs = hrs+2) : hrs++;
            return hrs;
        }, 0);
    }

}
