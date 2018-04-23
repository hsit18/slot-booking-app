import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { getMonth } from '../utils';

@Component({
    selector: 'app-view-booked-slots',
    templateUrl: './view-booked-slots.component.html',
    styleUrls: ['./view-booked-slots.component.css']
})

export class ViewBookedSlotsComponent {

    /*
      ViewBookedSlotsComponent constructor
    */
    constructor(
      public dialogRef: MatDialogRef<ViewBookedSlotsComponent>,
      @Inject(MAT_DIALOG_DATA) public data: any) {

    }

   /*
     Dialog close handler
   */
    public get dateView(): string {
      const currentDate = this.data.currentDate;
      return `${this.data.day}-${getMonth(currentDate.getMonth())}-${currentDate.getFullYear()}`
    }

    /*
      Return formatted slot name eg. Meetpoint A at 15$ for 1 hours
    */
    public slotName(bs) {
        const slot = this.data.slots.find(s => s.id === bs.slot_id);
        return `${slot.name} at ${slot.price}$ for ${slot.hour} hour(s)`
    }

    /*
      Dialog close handler
    */
    closeClick(): void {
      this.dialogRef.close();
    }

}
