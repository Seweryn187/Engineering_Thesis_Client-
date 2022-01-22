import { NgModule } from '@angular/core';
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
import {HttpClientModule} from "@angular/common/http";
import {TableModule} from "primeng/table";
import { SignUpComponent } from './sign-up/sign-up.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import { ArchivalDataComponent } from './archival-data/archival-data.component';
import {ButtonModule} from "primeng/button";
import {ChartModule} from "primeng/chart";
import { NotFoundPageComponent } from './not-found-page/not-found-page.component';
import {DropdownModule} from "primeng/dropdown";
import {authInterceptorProviders} from "./authentication.interceptor";
import { UserProfileComponent } from './user-profile/user-profile.component';
import {ConfirmPopupModule} from "primeng/confirmpopup";
import {RippleModule} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import {RadioButtonModule} from "primeng/radiobutton";
import {CheckboxModule} from "primeng/checkbox";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatSelectModule} from "@angular/material/select";
import {InputNumberModule} from "primeng/inputnumber";

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
    NotFoundPageComponent,
    UserProfileComponent
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
        FormsModule,
        ConfirmPopupModule,
        RippleModule,
        DialogModule,
        RadioButtonModule,
        CheckboxModule,
        MatFormFieldModule,
        MatSelectModule,
        InputNumberModule
    ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
