import { Component, OnInit, OnDestroy } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-book-slot',
    templateUrl: './book-slot.component.html',
    styleUrls: ['./book-slot.component.css']
})
export class BookSlotComponent implements OnInit, OnDestroy {
    private paramsSubscription: Subscription;

    constructor(
        private route: ActivatedRoute
    ) { }

    public ngOnInit(): void {
        this.paramsSubscription = this.route.params.subscribe((params: Params) => {
            console.log(params);
        });
    }

    public ngOnDestroy(): void {
        if (this.paramsSubscription) {
            this.paramsSubscription.unsubscribe();
        }
    }

}
