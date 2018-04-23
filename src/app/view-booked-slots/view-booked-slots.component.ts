import {Component, OnInit, Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import { getMonth } from '../utils';

@Component({
    selector: 'app-view-booked-slots',
    templateUrl: './view-booked-slots.component.html',
    styleUrls: ['./view-booked-slots.component.css']
})

export class ViewBookedSlotsComponent {

    constructor(
     public dialogRef: MatDialogRef<ViewBookedSlotsComponent>,
     @Inject(MAT_DIALOG_DATA) public data: any) {
       console.log(data);
     }


    public get dateView(): string {
      const currentDate = this.data.currentDate;
      return `${this.data.day}-${getMonth(currentDate.getMonth())}-${currentDate.getFullYear()}`
    }

    public slotName(bs) {
        const slot = this.data.slots.find(s => s.id === bs.slot_id);
        return `${slot.name} at ${slot.price}$ for ${slot.hour} hour(s)`
    }

    closeClick(): void {
      this.dialogRef.close();
    }

}
