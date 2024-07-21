import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';
import { CrudDetailComponent } from '../../../../shared/components/crud/crud-detail/crud-detail.component';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [CrudDetailComponent, DatePipe],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  providers: [DatePipe]
})
export class OrderDetailsComponent implements OnInit {
  id: string | null = null;
  order: any | null = null;
  displayFields = [
    { title: 'ID', field: 'id' },
    { title: 'Date de Création', field: 'createdAt' },
    { title: 'Date de Mise à Jour', field: 'updatedAt' },
    { title: 'Nom de l\'Entreprise', field: 'company.name' },
    { title: 'Nom du Client', field: 'client.name' }
  ];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private datePipe: DatePipe
  ) { }

  ngOnInit(): void {
    this.getParams();
    if (this.id) {
      this.getOrder(this.id);
    }
  }

  getParams(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.id = id;
    }
  }

  getOrder(id: string): void {
    this.orderService.getOrder(id).pipe(
      map(order => ({
        ...order,
        createdAt: order.createdAt ? this.datePipe.transform(order.createdAt, 'dd/MM/yyyy') : null,
        updatedAt: order.updatedAt ? this.datePipe.transform(order.updatedAt, 'dd/MM/yyyy') : null,
      }))
    ).subscribe({
      next: order => this.order = order,
      error: err => console.error('Error loading order:', err)
    })
  }

}
