import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DayViewComponent } from './day-view/day-view.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'day-view', component: DayViewComponent }
];