import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { Observable } from 'rxjs/Observable';

import { getHours, getMinutes } from '../utils';

import { AppService } from '../app.service';

import { Slot } from '../interfaces/slots';
import { BookedSlot } from '../interfaces/bookedSlots';

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

    public slots: Slot[];
    public rooms: Slot[];
    public bookedSlots: BookedSlot[] = [];

    private dataSub: Subscription;
    private roomsSub: Subscription;

    /*
      BookSlotComponent constructor
    */
    constructor(
        private appService: AppService,
        private router: Router,
        private route: ActivatedRoute
    ) {
        this.formGroup = new FormGroup({
            name: new FormControl(),
            room: new FormControl('1'),
            date: new FormControl(new Date()),
            hours: new FormControl(),
            minutes: new FormControl(),
            comments: new FormControl()
        });
    }

    /*
      ngOnInit lifecycle method
    */
    public ngOnInit(): void {

        this.route.params.take(1).subscribe((params: Params) => {
            if(params && params.date) {
                this.formGroup.get('date').setValue(new Date(Number(params.date)));
            }
        });

        this.dataSub = Observable.combineLatest(
            this.appService.getBookedSlots(),
            this.appService.getSlots()
        ).subscribe((res: [BookedSlot[], Slot[]]) => [this.bookedSlots, this.slots] = res);

        this.roomsSub = this.appService
            .getSlots()
            .subscribe(
                (slots: Slot[]) => {
                    this.slots = slots;
                }
            );
    }

    /*
      ngOnDestroy lifecycle method to unsubscribe roomsSub
    */
    public ngOnDestroy(): void {
        if (this.roomsSub) {
            this.roomsSub.unsubscribe();
        }
    }

    /*
      Getter to get slot price and its hour
    */
    public get selectedRoomText(): string {
        if (this.rooms) {
            const roomObj = this.rooms.find((room: Slot) => room.id == this.formGroup.controls.room.value);
            return (roomObj) ? `Rate: ${roomObj.price}$ for ${roomObj.hour} hour(s)` : '';
        }
    }

    /*
      Form submit handler to save the slot
    */
    public bookSlot(): void {
        const formVal = this.formGroup.value;
        this.appService.bookSlot({
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

    /*
      Cancel handler to navigate to calendar view
    */
    public cancelHandler(): void {
        this.router.navigate(['home']);
    }

    /*
      get end time hour based on start time hour
    */
    public getEndTime(hr: string): string {
        const indx: number = this.hours.findIndex(h => h === hr);
        return this.hours[indx + 1];
    }

    /*
      check the availabilty for slots on change of date and time
    */
    public checkRoomsAvailable() {
        const slotIds = [];
        const formVal = this.formGroup.value;
        const timeSt = new Date();
        const timeEt = new Date();
        const selectedStartTime = new Date();
        const selectedEndTime = new Date();

        if (formVal.date && formVal.hours && formVal.minutes) {
            const endHour = this.getEndTime(formVal.hours);
            selectedStartTime.setHours(formVal.hours, formVal.minutes, 0);
            selectedEndTime.setHours(parseInt(endHour, 10), formVal.minutes, 0);

            const bookedRoomsByDate: BookedSlot[] = this.bookedSlots.filter(bs => {
                let st = bs.startTime;
                let et = bs.endTime;
                if (bs.day === formVal.date.getDate()
                    && bs.month === formVal.date.getMonth()
                    && bs.year === formVal.date.getFullYear()) {
                    timeSt.setHours(parseInt(st.split(":")[0], 10), parseInt(st.split(":")[1], 10), 0);
                    timeEt.setHours(parseInt(et.split(":")[0], 10), parseInt(st.split(":")[1], 10), 0);

                    return ((timeSt <= selectedStartTime && timeEt >= selectedStartTime) || (timeSt <= selectedEndTime && timeEt >= selectedEndTime));
                }
            });

            bookedRoomsByDate.forEach(bs => {
              if(bs.slot_id === 5) {
                slotIds.push(3, 4);
              } else if(bs.slot_id === 3 || bs.slot_id === 4) {
                slotIds.push(5);
              }
              slotIds.push(bs.slot_id);
            });
            console.log(slotIds);
            this.rooms = this.slots.filter(s => slotIds.indexOf(s.id) === -1);
            this.formGroup.get('room').setValue(null);
            console.log(this.rooms);
        }
    }
}
