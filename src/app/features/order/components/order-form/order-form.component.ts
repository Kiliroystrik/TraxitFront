import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ClientService } from './../../../client/services/client.service';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';
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
import { ConfirmDeleteModalComponent } from '../../../../shared/components/confirm-delete-modal/confirm-delete-modal.component';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [
    StepModalComponent,
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
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  selectedTab: string = 'basic';
  clients: Client[] = [];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private clientService: ClientService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      client: ['', Validators.required],
      orderSteps: this.fb.array([])
    });

    this.getClients();
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
      fuelType: ['', Validators.required],
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
      data: step.value
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
}
