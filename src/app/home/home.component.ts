import { Component, OnInit } from '@angular/core';

import { getDaysForCurrentMonth, getTodayDate } from '../utils';
import { Router } from '@angular/router';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    public days: number[] = getDaysForCurrentMonth();
    public today: number = getTodayDate();

    constructor(
        private router: Router
    ) { }

    public ngOnInit(): void {
        // console.log(this.today);
    }

    public handleGridClick(date: number): void {
        if(date >= this.today) {
            this.router.navigate(['day-view']);
        }
    }

}
