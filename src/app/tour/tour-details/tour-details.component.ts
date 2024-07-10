import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../../interfaces/tour';
import { DatePipe } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [DatePipe],
  templateUrl: './tour-details.component.html',
  styleUrl: './tour-details.component.scss'
})
export class TourDetailsComponent implements OnInit, OnDestroy {
  tour: Tour | null = null;
  private tourSubscription: Subscription | null = null;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService
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
    this.tourSubscription = this.tourService.getTour(id).subscribe({
      next: tour => this.tour = tour,
      error: error => console.error('Erreur lors de la récupération de la tournée:', error)
    });
  }
}