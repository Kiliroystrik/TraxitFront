import { ClientService } from './../../../client/services/client.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { OrderService } from '../../services/order.service';
import { Order } from '../../interfaces/order';
import { Client } from '../../../client/interfaces/client';

@Component({
  selector: 'app-order-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.scss']
})
export class OrderFormComponent implements OnInit {
  orderForm!: FormGroup;
  selectedTab: string = 'basic';
  selectedStep: any = null;

  clients?: Client[];

  constructor(
    private fb: FormBuilder,
    private orderService: OrderService,
    private router: Router,
    private ClientService: ClientService,
  ) { }

  ngOnInit(): void {
    this.orderForm = this.fb.group({
      company: ['', Validators.required],
      client: [[''], Validators.required],
      createdAt: [new Date(), Validators.required],
      updatedAt: [new Date(), Validators.required],
      orderSteps: this.fb.array([])
    });

    this.getClients();
  }

  get orderSteps(): FormArray {
    return this.orderForm.get('orderSteps') as FormArray;
  }

  addStep(): void {
    const stepForm = this.fb.group({
      number: [this.orderSteps.length + 1, Validators.required],
      description: ['', Validators.required],
      date: [new Date(), Validators.required]
    });
    this.orderSteps.push(stepForm);
  }

  openStepModal(step: any): void {
    this.selectedStep = step;
  }

  closeStepModal(): void {
    this.selectedStep = null;
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
  }

  createOrder(): void {
    if (this.orderForm.valid) {
      const newOrder: Order = this.orderForm.value;
      this.orderService.createOrder(newOrder).subscribe(order => {
        this.router.navigate(['/gestion-des-commandes', order.id]);  // Redirige vers la page de détails de la nouvelle commande
      });
    }
  }

  getClients(): void {
    this.ClientService.getClients().subscribe({
      next: clients => {
        this.clients = clients;
      },
      error: error => {
        console.error('Erreur lors de la recuperation des clients:', error);
      }
    })
  }
}
