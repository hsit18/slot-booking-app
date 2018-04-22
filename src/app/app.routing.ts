import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DayViewComponent } from './day-view/day-view.component';
import { BookSlotComponent } from './book-slot/book-slot.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'day-view', component: DayViewComponent },
    { path: 'book-slot/:id', component: BookSlotComponent }
];