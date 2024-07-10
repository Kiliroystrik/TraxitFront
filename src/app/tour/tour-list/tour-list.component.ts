import { TourService } from './../../services/tour.service';
import { Component, OnInit } from '@angular/core';
import { Tour } from '../../../interfaces/tour';
import { TourStep } from '../../../interfaces/tourstep';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [DatePipe, RouterModule],
  templateUrl: './tour-list.component.html',
  styleUrl: './tour-list.component.scss'
})
export class TourListComponent implements OnInit {
  tours: Tour[] = [];

  constructor(private TourService: TourService) { }

  ngOnInit(): void {
    this.getTours();
  }

  getTours(): void {
    this.TourService.getTours().subscribe(tours => {
      this.tours = tours;
    });
  }

  addTour(): void {
    const newTour: Tour = {
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      company: '/api/companies/1' // replace with actual company API resource identifier
    };
    this.TourService.createTour(newTour).subscribe(tour => {
      this.tours.push(tour);
    });
  }

  addTourStep(tour: Tour): void {
    const newStep: TourStep = {
      createdAt: new Date(),
      updatedAt: new Date(),
      actualDate: new Date(),
      actualArrival: new Date(),
      actualDeparture: new Date(),
      stepNumber: tour.tourSteps ? tour.tourSteps.length + 1 : 1
    };
    this.TourService.createTourStep(tour["@id"]!, newStep).subscribe(step => {
      if (!tour.tourSteps) {
        tour.tourSteps = [];
      }
      tour.tourSteps.push(step["@id"]!);
    });
  }
}