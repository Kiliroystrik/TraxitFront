import { Component } from '@angular/core';
import { TourListComponent } from '../../features/tour/components/tour-list/tour-list.component';

@Component({
  selector: 'app-tour-managment',
  standalone: true,
  imports: [TourListComponent],
  templateUrl: './tour-managment.component.html',
  styleUrls: ['./tour-managment.component.scss'],
})
export class TourManagmentComponent { }
