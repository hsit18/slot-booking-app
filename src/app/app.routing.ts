import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BookSlotComponent } from './book-slot/book-slot.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'book-slot/:date', component: BookSlotComponent }
];