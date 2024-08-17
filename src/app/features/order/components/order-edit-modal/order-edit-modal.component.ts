import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Client } from '../../../client/interfaces/client';
import { ClientService } from '../../../client/services/client.service';

@Component({
  selector: 'app-order-edit-modal',
  standalone: true,
  imports: [
    MatDialogModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatOptionModule,
    MatSelectModule
  ],
  templateUrl: './order-edit-modal.component.html',
  styleUrls: ['./order-edit-modal.component.scss']
})
export class OrderEditModalComponent {
  orderForm: FormGroup;
  clients: Client[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<OrderEditModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private clientService: ClientService
  ) {
    this.orderForm = this.fb.group({
      client: [data?.order.client?.['@id'] || '', Validators.required], // Utilisation de l'identifiant @id
    });
  }

  ngOnInit(): void {
    this.getClients();
  }

  onSave(): void {
    if (this.orderForm.valid) {
      const updatedClientId = this.orderForm.value.client;
      this.dialogRef.close(updatedClientId); // Retourne uniquement l'ID du client sélectionné
    } else {
      console.log('Invalid form', this.orderForm.value);
      this.getFormValidationErrors();
    }
  }

  getFormValidationErrors() {
    Object.keys(this.orderForm.controls).forEach(key => {
      const controlErrors = this.orderForm.get(key)?.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach(keyError => {
          console.log(`Error in ${key}: ${keyError} ${controlErrors[keyError]}`);
        });
      }
    });
  }

  onClose(): void {
    this.dialogRef.close();
  }

  getClients(): void {
    this.clientService.getClients().subscribe({
      next: clients => this.clients = clients,
      error: err => console.error('Error loading clients:', err)
    });
  }
}
