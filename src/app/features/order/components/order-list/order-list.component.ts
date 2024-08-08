import { Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { catchError, map, startWith, switchMap, takeUntil } from 'rxjs/operators';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';
import { CrudListComponent } from "../../../../shared/components/crud/crud-list/crud-list.component";
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule, SortDirection } from '@angular/material/sort';
import { merge, Observable, of as observableOf, Subject } from 'rxjs';
import { MatTableModule } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-order-list',
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
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [DatePipe]
})
export class OrderListComponent implements AfterViewInit, OnDestroy {
  data: Order[] = [];
  displayedColumns: string[] = ['serialNumber', 'createdAt', 'updatedAt', 'company.name', 'client.name'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  private destroy$ = new Subject<void>();

  constructor(private orderService: OrderService, private datePipe: DatePipe, private router: Router) { }

  ngAfterViewInit() {
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.pipe(takeUntil(this.destroy$)).subscribe(() => this.paginator.pageIndex = 0);

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        takeUntil(this.destroy$),
        startWith({}),
        switchMap(() => {
          this.isLoadingResults = true;
          return this.orderService.getOrders(
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

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

  addOrder(): void {
    this.router.navigate(['/creation-commande']);
  }

  onView(order: Order): void {
    this.router.navigate(['/gestion-des-commandes', order.id]);
  }

  onEdit(order: Order): void {
    console.log('Edit order', order);
  }

  onDelete(order: Order): void {
    console.log('Delete order', order);
  }
}