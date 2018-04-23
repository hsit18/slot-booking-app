import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppMaterialImports } from './material.imports';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ViewBookedSlotsComponent } from './view-booked-slots/view-booked-slots.component';
import { BookSlotComponent } from './book-slot/book-slot.component';

import { AppService } from './app.service';

import { appRoutes } from './app.routing';

@NgModule({
    declarations: [
        AppComponent,
        ViewBookedSlotsComponent,
        HomeComponent,
        BookSlotComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        HttpModule,
        RouterModule.forRoot(appRoutes),
        BrowserAnimationsModule,
        ReactiveFormsModule,
        ...AppMaterialImports
    ],
    providers: [AppService],
    entryComponents: [ViewBookedSlotsComponent],
    bootstrap: [AppComponent]
})
export class AppModule { }
