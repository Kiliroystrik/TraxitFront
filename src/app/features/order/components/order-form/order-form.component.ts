import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClientService } from './../../../client/services/client.service';
import { OrderService } from '../../services/order.service';
import { Client } from '../../../client/interfaces/client';
import { AddressService } from '../../../address/services/address.service';
import { FuelTypeService } from '../../../fuel-type/services/fuel-type.service';
import { StatusService } from '../../../status/services/status.service';
import { ProductService } from '../../../product/services/product.service';
import { UnitService } from '../../../unit/services/unit.service';
import { StepModalComponent } from '../../../order-step/components/step-modal/step-modal.component';
import { ConfirmDeleteModalComponent } from '../../../../shared/components/confirm-delete-modal/confirm-delete-modal.component';
import { Order } from '../../interfaces/order';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss'],
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatDialogModule,
    MatTabsModule,
    MatDialogModule,
    MatSelectModule,
    MatTableModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule
  ],
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  selectedTab: string = 'basic';
  clients: Client[] = [];
  addresses: any[] = [];
  fuelTypes: any[] = [];
  statuses: any[] = [];
  products: any[] = [];
  units: any[] = [];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private clientService: ClientService,
    private addressService: AddressService,
    // private fuelTypeService: FuelTypeService,
    private statusService: StatusService,
    private productService: ProductService,
    private unitService: UnitService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      client: ['', Validators.required],
      orderSteps: this.fb.array([])
    });

    this.getClients();
    this.loadSharedData();
  }

  get orderSteps(): FormArray {
    return this.orderForm.get('orderSteps') as FormArray;
  }

  addStep(): void {
    const stepForm = this.fb.group({
      type: ['', Validators.required],
      description: ['', Validators.required],
      scheduledArrival: ['', Validators.required],
      scheduledDeparture: ['', Validators.required],
      address: ['', Validators.required],
      product: ['', Validators.required],
      unit: ['', Validators.required],
      quantity: [0, Validators.required],
      status: ['', Validators.required],
      position: [this.orderSteps.length + 1, Validators.required],
    });
    this.orderSteps.push(stepForm);
  }

  removeStep(step: any): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: '400px'
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.orderSteps.controls.indexOf(step);
        if (index !== -1) {
          this.orderSteps.removeAt(index);
          // Reindex the remaining steps
          this.orderSteps.controls.forEach((step, idx) => {
            step.get('position')?.setValue(idx + 1);
          });
        }
      }
    });
  }

  openStepModal(step: any): void {
    const dialogRef = this.dialog.open(StepModalComponent, {
      width: '400px',
      data: {
        step: step.value,
        addresses: this.addresses,
        fuelTypes: this.fuelTypes,
        statuses: this.statuses,
        products: this.products,
        units: this.units
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        step.setValue(result);
      }
    });
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  createOrder(): void {
    if (this.orderForm.valid) {
      const newOrder: Order = this.orderForm.value;
      console.log(newOrder);

      this.orderService.createOrder(newOrder).subscribe({
        next: order => {
          this.router.navigate(['/gestion-des-commandes', order.id]);
        },
        error: error => {
          console.error('Erreur lors de la creation de la commande:', error);
        }
      });
    }
  }

  getClients(): void {
    this.clientService.getClients().subscribe({
      next: clients => {
        this.clients = clients;
      },
      error: error => {
        console.error('Erreur lors de la recuperation des clients:', error);
      }
    });
  }

  loadSharedData(): void {
    this.addressService.getAddresses().subscribe({
      next: addresses => {
        this.addresses = addresses.items;
      },
      error: error => {
        console.error('Erreur lors de la recuperation des adresses:', error);
      }
    });

    // this.fuelTypeService.getFuelTypes().subscribe({
    //   next: fuelTypes => {
    //     this.fuelTypes = fuelTypes.items;
    //   },
    //   error: error => {
    //     console.error('Erreur lors de la recuperation des types de carburant:', error);
    //   }
    // });

    this.statusService.getStatuses().subscribe({
      next: statuses => {
        this.statuses = statuses.items;
      },
      error: error => {
        console.error('Erreur lors de la recuperation des statuts:', error);
      }
    });

    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products.items;
      },
      error: error => {
        console.error('Erreur lors de la recuperation des produits:', error);
      }
    });

    this.unitService.getUnits().subscribe({
      next: units => {
        this.units = units.items;
      },
      error: error => {
        console.error('Erreur lors de la recuperation des unités:', error);
      }
    });
  }
}
