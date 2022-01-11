import {Injectable, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FooterComponent } from './footer/footer.component';
import { CurrentValueTableComponent } from './current-value-table/current-value-table.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import { SignInComponent } from './sign-in/sign-in.component';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpHandler, HttpInterceptor, HttpRequest} from "@angular/common/http";
import {TableModule} from "primeng/table";
import { SignUpComponent } from './sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import { ArchivalDataComponent } from './archival-data/archival-data.component';
import {ButtonModule} from "primeng/button";
import {ChartModule} from "primeng/chart";
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import {DropdownModule} from "primeng/dropdown";
import {AppService, XhrInterceptor} from "./app.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    FooterComponent,
    CurrentValueTableComponent,
    SignInComponent,
    SignUpComponent,
    ArchivalDataComponent,
    NotFoundPageComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatButtonModule,
        HttpClientModule,
        TableModule,
        ReactiveFormsModule,
        InputTextModule,
        ButtonModule,
        ChartModule,
        DropdownModule,
        FormsModule
    ],
  providers: [AppService, { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }


