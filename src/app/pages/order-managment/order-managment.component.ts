import { Component } from '@angular/core';
import { OrderListComponent } from "../../features/order/components/order-list/order-list.component";

@Component({
  selector: 'app-order-managment',
  standalone: true,
  imports: [OrderListComponent],
  templateUrl: './order-managment.component.html',
  styleUrl: './order-managment.component.scss'
})
export class OrderManagmentComponent {

}
