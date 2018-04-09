import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HotelComponent }   from './hotel/hotel.component';
import {HotelDetailsComponent} from "./hotel-details/hotel-details.component";

const routes: Routes = [
  { path: '', redirectTo: '/hotel', pathMatch: 'full' },
  { path: 'hotel', component: HotelComponent },
  { path: 'hotel/:id', component: HotelDetailsComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
