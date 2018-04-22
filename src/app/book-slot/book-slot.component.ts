import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-book-slot',
    templateUrl: './book-slot.component.html',
    styleUrls: ['./book-slot.component.css']
})
export class BookSlotComponent implements OnInit, OnDestroy {
    public options: FormGroup;

    constructor(fb: FormBuilder) {
        this.options = fb.group({
            hideRequired: false,
            floatLabel: 'auto',
        });
    }

    public ngOnInit(): void {

    }

    public ngOnDestroy(): void {

    }

}
