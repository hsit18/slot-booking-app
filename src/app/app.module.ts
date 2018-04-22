import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import {
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatFormFieldModule,
    MatCheckboxModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { appRoutes } from './app.routing';
import { DayViewComponent } from './day-view/day-view.component';
import { BookSlotComponent } from './book-slot/book-slot.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DayViewComponent,
        BookSlotComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        MatToolbarModule,
        MatGridListModule,
        MatListModule,
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatRadioModule,
        MatOptionModule,
        MatSelectModule,
        MatInputModule,
        BrowserAnimationsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatButtonModule
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule { }
