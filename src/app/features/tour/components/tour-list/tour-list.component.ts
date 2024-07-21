import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../interfaces/tour';
import { TourStep } from '../../../tour-step/interfaces/tourstep';
import { CrudListComponent } from '../../../../shared/components/crud/crud-list/crud-list.component';
import { map } from 'rxjs';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [DatePipe, RouterModule, CrudListComponent],
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss'],
  providers: [DatePipe],
})
export class TourListComponent implements OnInit {
  tours: any[] = []; // Note: We'll be using a transformed version of Tour for the display
  displayFields = [
    { title: 'startDate', field: 'startDate' },
    { title: 'endDate', field: 'endDate' },
    { title: 'company', field: 'company' },

  ];

  constructor(private tourService: TourService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.getTours();
  }

  getTours(): void {
    this.tourService.getTours().pipe(
      map(tours => tours.map(tour => ({
        ...tour,
        startDate: tour.startDate ? this.datePipe.transform(tour.startDate, 'dd/MM/yyyy') : null,
        endDate: tour.endDate ? this.datePipe.transform(tour.endDate, 'dd/MM/yyyy') : null,
        createdAt: tour.createdAt ? this.datePipe.transform(tour.createdAt, 'dd/MM/yyyy') : null,
        updatedAt: tour.updatedAt ? this.datePipe.transform(tour.updatedAt, 'dd/MM/yyyy') : null,
      })))
    ).subscribe(transformedTours => {
      this.tours = transformedTours;
    });
  }
  addTour(): void {
    const newTour: Tour = {
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: new Date(),
      endDate: new Date(),
      company: '/api/companies/1', // replace with actual company API resource identifier
    };
    this.tourService.createTour(newTour).subscribe((tour) => {
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
      stepNumber: tour.tourSteps ? tour.tourSteps.length + 1 : 1,
    };
    this.tourService.createTourStep(tour['@id']!, newStep).subscribe((step) => {
      if (!tour.tourSteps) {
        tour.tourSteps = [];
      }
      tour.tourSteps.push(step['@id']!);
    });
  }

  onView(tour: Tour): void {
    this.router.navigate(['/gestion-des-tournees', tour.id]);  // Redirige vers la page de détails
  }

  onEdit(tour: Tour): void {
    console.log('Edit tour', tour);
  }

  onDelete(tour: Tour): void {
    console.log('Delete tour', tour);
  }
}
