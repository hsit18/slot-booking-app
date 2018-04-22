import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AppService } from './app.service';
import { appRoutes } from './app.routing';
import { BookSlotComponent } from './book-slot/book-slot.component';
import { AppMaterialImports } from './material.imports';

@NgModule({
    declarations: [
        AppComponent,
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
    bootstrap: [AppComponent]
})
export class AppModule { }
