import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Order } from '../../interfaces/order';
import { OrderService } from '../../services/order.service';
import { CrudListComponent } from "../../../../shared/components/crud/crud-list/crud-list.component";

@Component({
  selector: 'app-order-list',
  standalone: true,
  imports: [DatePipe, CrudListComponent],
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss'],
  providers: [DatePipe]
})
export class OrderListComponent implements OnInit {
  orders: any[] = [];
  displayFields = [
    { title: 'ID', field: 'id' },
    { title: 'Date de Création', field: 'createdAt' },
    { title: 'Date de Mise à Jour', field: 'updatedAt' },
    { title: 'Nom de l\'Entreprise', field: 'company.name' },
    { title: 'Nom du Client', field: 'client.name' }
  ];

  constructor(private orderService: OrderService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.getOrders();
  }

  getOrders(): void {
    this.orderService.getOrders().pipe(
      map(orders => orders.map(order => ({
        ...order,
        createdAt: order.createdAt ? this.datePipe.transform(order.createdAt, 'dd/MM/yyyy') : null,
        updatedAt: order.updatedAt ? this.datePipe.transform(order.updatedAt, 'dd/MM/yyyy') : null,
      })))
    ).subscribe(transformedOrders => {
      this.orders = transformedOrders;
    });
  }

  addOrder(): void {
    this.router.navigate(['/creation-commande']);  // Redirige vers la page de création
  }

  onView(order: Order): void {
    this.router.navigate(['/gestion-des-commandes', order.id]);  // Redirige vers la page de détails
  }

  onEdit(order: Order): void {
    console.log('Edit order', order);
  }

  onDelete(order: Order): void {
    console.log('Delete order', order);
  }
}
