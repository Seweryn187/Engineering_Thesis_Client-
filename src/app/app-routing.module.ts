import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {CurrentValueTableComponent} from "./current-value-table/current-value-table.component";

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'home/sign-in', component: SignInComponent },
  { path: 'current-value-table', component: CurrentValueTableComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
