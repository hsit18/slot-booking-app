import { Component, OnInit, OnDestroy } from '@angular/core';

import { getDaysForCurrentMonth, getTodayDate } from '../utils';
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

    private slots: Slot[] = [];
    private bookedSlots: BookedSlot[] = [];
    private dataSub: Subscription;

    constructor(
        private router: Router,
        private appService: AppService
    ) { }

    public ngOnInit(): void {
        this.dataSub = Observable.combineLatest(
            this.appService.getBookedSlots(),
            this.appService.getSlots()
        )
        .subscribe((res: [BookedSlot[], Slot[]]) => [this.bookedSlots, this.slots] = res);
    }

    public handleGridClick(date: number): void {
        this.router.navigate(['book-slot']);
    }

    public getbookedSlot(day: number): BookedSlot[] {
        return this.bookedSlots.filter((bs: BookedSlot) => bs.day === day);
    }

    public getSlotName(slotId: number): string {
        return this.slots.find((slot: Slot) => slot.id === slotId).name;
    }

    public ngOnDestroy(): void {
        if (this.dataSub) {
            this.dataSub.unsubscribe();
        }
    }

}
