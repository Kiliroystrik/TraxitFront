import { TourService } from '../../services/tour.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { map, Subscription } from 'rxjs';
import { Tour } from '../../interfaces/tour';

@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss'],
  providers: [DatePipe],
})
export class TourDetailsComponent implements OnInit, OnDestroy {
  tour: any | null = null;
  private tourSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getTour(id);
    }
  }

  ngOnDestroy(): void {
    if (this.tourSubscription) {
      this.tourSubscription.unsubscribe();
    }
  }

  getTour(id: string): void {
    this.tourSubscription = this.tourService.getTour(id).pipe(
      map(tour => ({
        ...tour,
        startDate: tour.startDate ? this.datePipe.transform(tour.startDate, 'dd/MM/yyyy') : null,
        endDate: tour.endDate ? this.datePipe.transform(tour.endDate, 'dd/MM/yyyy') : null,
        createdAt: tour.createdAt ? this.datePipe.transform(tour.createdAt, 'dd/MM/yyyy') : null,
        updatedAt: tour.updatedAt ? this.datePipe.transform(tour.updatedAt, 'dd/MM/yyyy') : null,
      }))
    ).subscribe({
      next: (tour) => {
        this.tour = tour;
      },
      error: (error) => {
        console.error('Error retrieving tour:', error);
      },
    });
  }
}
