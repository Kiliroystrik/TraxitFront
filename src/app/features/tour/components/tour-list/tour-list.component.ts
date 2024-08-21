import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../interfaces/tour';
import { TourStep } from '../../../tour-step/interfaces/tourstep';
import { CrudListComponent } from '../../../../shared/components/crud/crud-list/crud-list.component';
import { catchError, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf, Subject } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-tour-list',
  standalone: true,
  imports: [
    DatePipe,
    CrudListComponent,
    MatProgressSpinnerModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    RouterModule,
  ],
  templateUrl: './tour-list.component.html',
  styleUrls: ['./tour-list.component.scss'],
  providers: [DatePipe],
})
export class TourListComponent implements AfterViewInit, OnDestroy {
  data: Tour[] = [];
  displayedColumns: string[] = ['id', 'createdAt', 'updatedAt'];
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private destroy$ = new Subject<void>();

  constructor(private tourService: TourService, private datePipe: DatePipe, private router: Router) { }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.pipe(takeUntil(this.destroy$)).subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        takeUntil(this.destroy$),
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.tourService.getTours(
            this.sort.active,
            this.sort.direction,
            this.paginator.pageIndex + 1,
            this.paginator.pageSize
          ).pipe(catchError(() => observableOf(null)));
        }),
        map(data => {
          this.isLoadingResults = false;
          this.isRateLimitReached = data === null;

          if (data === null) {
            return [];
          }

          this.resultsLength = data.totalItems;
          return data.items;
        })
      )
      .subscribe(data => this.data = data);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  addTour(): void {
    const newTour: Tour = {
      createdAt: new Date(),
      updatedAt: new Date(),
      startDate: new Date(),
      endDate: new Date(),
    };
    this.tourService.createTour(newTour).subscribe((tour) => {
      this.data.push(tour);
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
