import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { getHours, getMinutes } from '../utils';
import { AppService } from '../app.service';

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
    public rooms;

    private roomsSub: Subscription;

    constructor(
        private fb: FormBuilder,
        private appService: AppService
    ) {
        this.formGroup = fb.group({
            name: '',
            room: '1',
            date: '',
            hours: '00',
            minutes: '00',
            comments: ''
        });
    }

    public ngOnInit(): void {
        this.roomsSub = this.appService
        .getSlots()
        .subscribe(
            (slots) => {
                console.log(slots);
                this.rooms = slots;
            }
        );
    }

    public get roomRate() {
        if(this.rooms) {
            const roomObj = this.rooms.find(room => room.id == this.formGroup.controls.room.value);
            return roomObj.price;
        }
    }

    public bookSlot(): void {
        console.log(this.formGroup.value);
    }

    public ngOnDestroy(): void {
        if (this.roomsSub) {
            this.roomsSub.unsubscribe();
        }
    }

}
