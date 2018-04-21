import { Component, OnInit } from '@angular/core';
import {
    getHours,
    getMinutes,
    getTodayDate,
    getCurrentHour
} from '../utils';

@Component({
    selector: 'app-day-view',
    templateUrl: './day-view.component.html',
    styleUrls: ['./day-view.component.css']
})
export class DayViewComponent implements OnInit {
    public hours: string[] = getHours();
    public minutes: string[] = getMinutes();
    public today: number = getTodayDate();

    get currentHour(): number {
        return getCurrentHour();
    }

    constructor() { }

    public ngOnInit(): void {
        console.log(this.hours);
    }

    public setActiveClass(hr: string): boolean {
        return Number(hr) === this.currentHour;
    }

    public setDisabledClass(hr: string): boolean {
        // if selected date is equal to current date
        const today = true;
        return today ? Number(hr) < this.currentHour : false;
    }

}
