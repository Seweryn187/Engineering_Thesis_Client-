import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from "./home/home.component";
import {SignInComponent} from "./sign-in/sign-in.component";
import {CurrentValueTableComponent} from "./current-value-table/current-value-table.component";
import {SignUpComponent} from "./sign-up/sign-up.component";
import {ArchivalDataComponent} from "./archival-data/archival-data.component";
import {NotFoundPageComponent} from "./not-found-page/not-found-page.component";

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'home/sign-in', component: SignInComponent },
  { path: 'home/current-value-table', component: CurrentValueTableComponent },
  { path: 'home/sign-up', component: SignUpComponent},
  { path: 'home/archival-data/:abbr/:source', component: ArchivalDataComponent},
  { path: '**', component: NotFoundPageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
