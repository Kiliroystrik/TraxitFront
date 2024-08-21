import { MatDatepickerModule } from '@angular/material/datepicker';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Address } from '../../../address/interfaces/address';
import { FuelType } from '../../../fuel-type/interfaces/fueltype';
import { Status } from '../../../status/interfaces/status';
import { Product } from '../../../product/interfaces/product';
import { Unit } from '../../../unit/interfaces/unit';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

@Component({
  selector: 'app-step-modal',
  templateUrl: './step-modal.component.html',
  styleUrls: ['./step-modal.component.scss'],
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
})
export class StepModalComponent implements OnInit {
  stepForm: FormGroup;
  stepTypes: string[] = ['Retrait', 'Dépôt', 'Transport', 'Inspection'];
  addresses: Address[] = [];
  fuelTypes: FuelType[] = [];
  statuses: Status[] = [];
  products: Product[] = [];
  units: Unit[] = [];

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<StepModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.stepForm = this.fb.group({
      type: [data?.step?.type || '', Validators.required],
      description: [data?.step?.description || '', Validators.required],
      scheduledArrival: [data?.step?.scheduledArrival || '', Validators.required],
      scheduledDeparture: [data?.step?.scheduledDeparture || '', Validators.required],
      address: [data?.step?.address?.['@id'] || '', Validators.required], // Utilisation de l'identifiant @id
      status: [data?.step?.status?.['@id'] || '', Validators.required], // Utilisation de l'identifiant @id
      product: [data?.step?.product?.['@id'] || '', Validators.required], // Utilisation de l'identifiant @id
      unit: [data?.step?.unit?.['@id'] || '', Validators.required], // Utilisation de l'identifiant @id
      quantity: [data?.step?.quantity || 0, Validators.required],
      position: [data?.step?.position || 0, Validators.required],
    });
  }

  ngOnInit(): void {
    this.addresses = this.data.addresses;
    this.fuelTypes = this.data.fuelTypes;
    this.statuses = this.data.statuses;
    this.products = this.data.products;
    this.units = this.data.units;
  }

  onSave(): void {
    if (this.stepForm.valid) {

      const formValue = this.stepForm.value;

      // Convertir la quantité en chaîne de caractères
      formValue.quantity = formValue.quantity.toString();

      // Reconstruire l'objet step avec les entités sélectionnées
      const updatedStep = {
        ...this.data.step,
        ...this.stepForm.value,
        address: this.addresses.find(addr => addr['@id'] === this.stepForm.value.address),
        status: this.statuses.find(stat => stat['@id'] === this.stepForm.value.status),
        product: this.products.find(prod => prod['@id'] === this.stepForm.value.product),
        unit: this.units.find(unit => unit['@id'] === this.stepForm.value.unit),
        order: this.data.order['@id']
      };

      this.dialogRef.close(updatedStep);
    } else {
      console.log('invalid step form', this.stepForm.value);
      this.getFormValidationErrors();
    }
  }

  getFormValidationErrors() {
    Object.keys(this.stepForm.controls).forEach(key => {
      const controlErrors = this.stepForm.get(key)?.errors;
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
}
