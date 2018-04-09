import {Component, OnInit, Input} from '@angular/core';

@Component({
    selector: 'app-hotel-amenity',
    templateUrl: './hotel-amenity.component.html',
    styleUrls: ['./hotel-amenity.component.css']
})
export class HotelAmenityComponent implements OnInit {
    @Input() amenity: string;


    ngOnInit(): void {
    }
}
