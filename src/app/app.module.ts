import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
    MatToolbarModule,
    MatGridListModule,
    MatListModule,
    MatIconModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { appRoutes } from './app.routing';
import { DayViewComponent } from './day-view/day-view.component';


@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        DayViewComponent
    ],
    imports: [
        BrowserModule,
        CommonModule,
        RouterModule.forRoot(appRoutes),
        MatToolbarModule,
        MatGridListModule,
        MatListModule,
        MatIconModule
    ],
    providers: [AppService],
    bootstrap: [AppComponent]
})
export class AppModule { }
