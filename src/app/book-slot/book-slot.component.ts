import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { getHours, getMinutes } from '../utils';
import { AppService } from '../app.service';
import { Slot } from '../interfaces/slots';

@Component({
    selector: 'app-book-slot',
    templateUrl: './book-slot.component.html',
    styleUrls: ['./book-slot.component.css']
})
export class BookSlotComponent implements OnInit, OnDestroy {
    public formGroup: FormGroup;
    public hours: string[] = getHours();
    public minutes: string[] = getMinutes();
    public today: Date = new Date();
    public rooms: Slot[];

    private roomsSub: Subscription;

    constructor(
        private appService: AppService,
        private router: Router
    ) {
        this.formGroup = new FormGroup({
            name: new FormControl(),
            room: new FormControl('1'),
            date: new FormControl(),
            hours: new FormControl(),
            minutes: new FormControl(),
            comments: new FormControl()
        });
    }

    public ngOnInit(): void {
        this.roomsSub = this.appService
            .getSlots()
            .subscribe(
                (slots: Slot[]) => {
                    console.log(slots);
                    this.rooms = slots;
                }
            );
    }

    public get roomRate(): number {
        if (this.rooms) {
            const roomObj = this.rooms.find((room: Slot) => room.id == this.formGroup.controls.room.value);
            return roomObj.price;
        }
    }

    public get hourRate(): number {
        if (this.rooms) {
            const roomObj = this.rooms.find((room: Slot) => room.id == this.formGroup.controls.room.value);
            return roomObj.hour;
        }
    }

    public bookSlot(): void {
        const formVal = this.formGroup.value;
        this.appService.bookSlot({
            id: Date.now(),
            title: formVal.name,
            slot_id: parseInt(formVal.room, 10),
            day: formVal.date.getDate(),
            month: formVal.date.getMonth(),
            year: formVal.date.getFullYear(),
            startTime: `${formVal.hours}:${formVal.minutes}`,
            endTime: `${this.getEndTime(formVal.hours)}:${formVal.minutes}`,
            comments: formVal.comments
        })
        .take(1)
        .subscribe(res => {
            this.router.navigate(['home']);
        }, err => {
            console.log(err);
        });
    }

    public getEndTime(hr: string): string {
        const indx: number = this.hours.findIndex(h => h === hr);
        return this.hours[indx + 1];
    }

    public ngOnDestroy(): void {
        if (this.roomsSub) {
            this.roomsSub.unsubscribe();
        }
    }

}
