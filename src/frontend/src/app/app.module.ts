import {NgModule}       from '@angular/core';
import {BrowserModule}  from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule}    from '@angular/forms';
import {HttpClientModule}    from '@angular/common/http';
import {AppRoutingModule}     from './app-routing.module';
import {AppComponent}         from './app.component';
import {HotelSearchComponent}  from './hotel-search/hotel-search.component';
import {HotelStarsComponent}  from './hotel-stars/hotel-stars.component';
import {HotelCardComponent}  from './hotel-card/hotel-card.component';
import {HotelStarsIconsComponent}  from './hotel-stars-icons/hotel-stars-icons.component';
import {HotelAmenityComponent}  from './hotel-amenity/hotel-amenity.component';
import {HotelComponent} from "./hotel/hotel.component";
import {HotelService} from "./hotel.service";
import {InlineSVGModule} from 'ng-inline-svg';
import {HotelDetailsComponent} from "./hotel-details/hotel-details.component";


@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        AppRoutingModule,
        HttpClientModule,
        InlineSVGModule,

    ],
    declarations: [
        AppComponent,
        HotelComponent,
        HotelCardComponent,
        HotelAmenityComponent,
        HotelStarsIconsComponent,
        HotelSearchComponent,
        HotelStarsComponent,
        HotelDetailsComponent
    ],
    providers: [HotelService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
