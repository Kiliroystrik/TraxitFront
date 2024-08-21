import { OrderStep } from './../../../order-step/interfaces/orderstep';
import { OrderStepService } from './../../../order-step/services/order-step.service';
import { MatChipsModule } from '@angular/material/chips';
import { MatGridListModule } from '@angular/material/grid-list';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';
import { AddressService } from '../../../address/services/address.service';
import { FuelTypeService } from '../../../fuel-type/services/fuel-type.service';
import { StatusService } from '../../../status/services/status.service';
import { UnitService } from '../../../unit/services/unit.service';
import { ProductService } from '../../../product/services/product.service';

import { StepModalComponent } from '../../../order-step/components/step-modal/step-modal.component';
import { ConfirmDeleteModalComponent } from '../../../../shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { OrderEditModalComponent } from '../order-edit-modal/order-edit-modal.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { CdkDragDrop, CdkDropList, CdkDrag, moveItemInArray } from '@angular/cdk/drag-drop';

import { StatusColorDirective } from '../../../../shared/directives/status-color.directive';
import { Address } from '../../../address/interfaces/address';
import { FuelType } from '../../../fuel-type/interfaces/fueltype';
import { Status } from '../../../status/interfaces/status';
import { Unit } from '../../../unit/interfaces/unit';
import { Product } from '../../../product/interfaces/product';
import { ClientService } from '../../../client/services/client.service';

@Component({
  selector: 'app-order-details',
  standalone: true,
  imports: [
    MatDialogModule, MatFormFieldModule, MatTableModule, MatSelectModule, MatInputModule, MatButtonModule, MatTabsModule, MatIconModule, MatCardModule, DatePipe, MatListModule, MatGridListModule, MatChipsModule, CdkDropList, CdkDrag, StatusColorDirective
  ],
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.scss'],
  providers: [DatePipe],
})
export class OrderDetailsComponent implements OnInit, OnDestroy {
  private readonly destroy$ = new Subject<void>();

  id: string | null = null;
  order!: Order;
  selectedStep: OrderStep | null = null;
  orderSteps: OrderStep[] = [];
  isEditMode = false;
  addresses: Address[] = [];
  fuelTypes: FuelType[] = [];
  statuses: Status[] = [];
  units: Unit[] = [];
  products: Product[] = [];

  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService,
    private dialog: MatDialog,
    private addressService: AddressService,
    private fuelTypeService: FuelTypeService,
    private statusService: StatusService,
    private unitService: UnitService,
    private productService: ProductService,
    private router: Router,
    private orderStepService: OrderStepService,
    private clientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.getParams();
    if (this.id) {
      this.getOrder(this.id);
      this.getOrderStepsByOrder(this.id);
    }
    this.loadSharedData();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getParams(): void {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  private getOrder(id: string): void {
    this.orderService.getOrder(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: order => this.order = order,
        error: err => console.error('Error loading order:', err)
      });
  }

  private getOrderStepsByOrder(id: string): void {
    this.orderStepService.getOrderStepsByOrder(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: orderSteps => this.orderSteps = orderSteps.items,
        error: err => console.error('Error loading order steps:', err)
      });
  }

  onEditOrder(order: Order): void {
    this.openDialog(OrderEditModalComponent, { order }).subscribe(result => {
      if (result) {
        const updatedClientIRI = result;
        this.patchOrderClient(order.id.toString(), updatedClientIRI);
      }
    });
  }

  private patchOrderClient(orderId: string, clientIRI: string): void {
    this.orderService.patchOrder(orderId, clientIRI).subscribe({
      next: () => {
        // Après avoir mis à jour l'ordre, récupère l'ordre complet pour mettre à jour localement
        this.loadUpdatedOrder(orderId);
      },
      error: err => console.error('Error updating order client:', err)
    });
  }

  private loadUpdatedOrder(orderId: string): void {
    this.orderService.getOrder(orderId)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: updatedOrder => {
          // Mettre à jour uniquement la partie client de l'ordre
          this.order.client = updatedOrder.client;
          console.log('Order client updated:', this.order);
        },
        error: err => console.error('Error loading updated order:', err)
      });
  }

  private openDialog(component: any, data: any) {
    return this.dialog.open(component, {
      width: '400px',
      data: data
    }).afterClosed();
  }

  onDeleteOrder(order: Order): void {
    this.openDialog(ConfirmDeleteModalComponent, {}).subscribe(result => {
      if (result) {
        this.orderService.deleteOrder(order.id.toString())
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () => this.router.navigate(['/gestion-des-commandes']),
            error: err => console.error('Error deleting order:', err)
          });
      }
    });
  }

  onEditStep(step: OrderStep): void {
    this.openStepModal(step);
  }

  onDeleteStep(step: OrderStep): void {
    this.openDialog(ConfirmDeleteModalComponent, {}).subscribe(result => {
      if (result) {
        this.orderSteps.splice(this.orderSteps.indexOf(step), 1)
        this.selectStep(null);
        this.orderStepService.deleteOrderStep(step.id.toString())
          .pipe(takeUntil(this.destroy$))
          .subscribe({
            next: () =>
              this.orderSteps.forEach((step, index) => {
                step.position = index;
                this.updateOrderStep(step);
              }),
            error: err => console.error('Error deleting step:', err)
          });
      }
    });
  }

  private openStepModal(step: OrderStep): Observable<OrderStep | null> {
    return this.dialog.open(StepModalComponent, {
      width: '400px',
      data: {
        step: step,
        addresses: this.addresses,
        fuelTypes: this.fuelTypes,
        statuses: this.statuses,
        products: this.products,
        units: this.units,
        order: this.order
      }
    }).afterClosed();
  }


  public onAddStep(): void {
    this.openStepModal({} as OrderStep).subscribe(result => {
      if (result) {
        // On ajoute la propriété 'position' à l'objet OrderStep ainsi que son order id
        result.position = this.orderSteps.length;
        console.table(result);
        // Si le modal a renvoyé des données, créez le nouvel OrderStep
        this.orderStepService.createOrderStep(this.order.id, result).subscribe({
          next: orderStep => {
            this.orderSteps.push(orderStep);
            this.selectStep(orderStep);
          },
          error: err => console.error('Error creating order step:', err)
        });
      }
    });
  }


  private updateOrderStep(orderStep: OrderStep): void {
    this.orderStepService.updateOrderStep(orderStep)
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => this.getOrderStepsByOrder(this.order.id.toString()),
        error: err => console.error('Error updating order:', err)
      });
  }

  private loadSharedData(): void {
    this.addressService.getAddresses().pipe(takeUntil(this.destroy$)).subscribe({
      next: addresses => this.addresses = addresses.items,
      error: error => console.error('Erreur lors de la récupération des adresses:', error),
    });

    this.statusService.getStatuses().pipe(takeUntil(this.destroy$)).subscribe({
      next: statuses => this.statuses = statuses.items,
      error: error => console.error('Erreur lors de la récupération des statuts:', error),
    });

    this.productService.getProducts().pipe(takeUntil(this.destroy$)).subscribe({
      next: products => this.products = products.items,
      error: error => console.error('Erreur lors de la récupération des produits:', error),
    });

    this.unitService.getUnits().pipe(takeUntil(this.destroy$)).subscribe({
      next: units => this.units = units.items,
      error: error => console.error('Erreur lors de la récupération des unités:', error),
    });
  }

  selectStep(step: OrderStep): void {
    this.selectedStep = this.selectedStep === step ? null : step;
  }

  toggleEditPosition(): void {
    if (this.isEditMode) {
      this.orderSteps.forEach((step, index) => {
        step.position = index;
        this.updateOrderStep(step);
      });
      this.isEditMode = !this.isEditMode;
    } else {
      this.isEditMode = !this.isEditMode;
    }
  }

  cancelEditPosition(): void {
    this.isEditMode = false;
    // On remet au tableau l'ordre initial
    this.getOrderStepsByOrder(this.order.id.toString());
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.orderSteps, event.previousIndex, event.currentIndex);
  }
}
