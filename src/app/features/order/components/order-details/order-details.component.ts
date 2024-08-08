import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { map, switchMap } from 'rxjs/operators';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';
import { CrudDetailComponent } from '../../../../shared/components/crud/crud-detail/crud-detail.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ClientService } from './../../../client/services/client.service';
import { Client } from '../../../client/interfaces/client';
import { StepModalComponent } from '../../../order-step/components/step-modal/step-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    StepModalComponent, MatDialogModule, MatFormFieldModule, MatTableModule, MatSelectModule, MatInputModule, MatButtonModule, MatTabsModule, MatIconModule, MatCardModule, CrudDetailComponent, DatePipe, MatListModule],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  providers: [DatePipe]
})
export class OrderDetailsComponent implements OnInit {
  id: string | null = null;
  order: Order | null = null;


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
    this.orderService.getOrder(id).subscribe({
      next: order => this.order = order,
      error: err => console.error('Error loading order:', err)
    })
  }

}
