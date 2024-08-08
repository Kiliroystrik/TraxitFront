import { UnitService } from './../../../unit/services/unit.service';
import { Unit } from './../../../unit/interfaces/unit';
import { FuelTypeService } from './../../../fuel-type/services/fuel-type.service';
import { AddressService } from '../../../address/services/address.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Observable } from 'rxjs';
import { Address } from '../../../address/interfaces/address';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { FuelType } from '../../../fuel-type/interfaces/fueltype';
import { StatusService } from '../../../status/services/status.service';
import { Status } from '../../../status/interfaces/status';
import { Product } from '../../../product/interfaces/product';
import { ProductService } from '../../../product/services/product.service';

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
export class StepModalComponent {
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
    private addressService: AddressService,
    private fuelTypeService: FuelTypeService,
    private statusService: StatusService,
    private productService: ProductService,
    private unitService: UnitService,
  ) {
    this.stepForm = this.fb.group({
      type: [data?.type || '', Validators.required],
      description: [data?.description || '', Validators.required],
      scheduledArrival: [data?.scheduledArrival || '', Validators.required],
      scheduledDeparture: [data?.scheduledDeparture || '', Validators.required],
      address: [data?.address || '', Validators.required],
      status: [data?.status || '', Validators.required],
      product: [data?.product || '', Validators.required],
      fuelType: [data?.fuelType || '', Validators.required],
      unit: [data?.unit || '', Validators.required],
      quantity: [data?.quantity || 0, Validators.required],
      position: [data?.position || 0, Validators.required],
    });

    this.getAddresses();
    this.getFuelTypes();
    this.getStatuses();
    this.getProducts();
    this.getUnits();
  }

  getAddresses(): void {
    this.addressService.getAddresses().subscribe({
      next: addresses => {
        this.addresses = addresses.items;
      },
      error: error => {
        console.error('Erreur lors de la recuperation des clients:', error);
      }
    });
  }

  getUnits(): void {
    this.unitService.getUnits().subscribe({
      next: units => {
        this.units = units.items;
      },
      error: error => {
        console.error('Erreur lors de la recuperation des clients:', error);
      }
    });
  }

  getFuelTypes(): void {
    this.fuelTypeService.getFuelTypes().subscribe({
      next: fuelTypes => {
        this.fuelTypes = fuelTypes.items;
      },
      error: error => {
        console.error('Erreur lors de la recuperation des clients:', error);
      }
    });
  }

  getStatuses(): void {
    this.statusService.getStatuses().subscribe({
      next: statuses => {
        this.statuses = statuses.items;
      },
      error: error => {
        console.error('Erreur lors de la recuperation des clients:', error);
      }
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe({
      next: products => {
        this.products = products.items;
      },
      error: error => {
        console.error('Erreur lors de la recuperation des clients:', error);
      }
    });
  }

  onSave(): void {
    if (this.stepForm.valid) {
      const formValue = this.stepForm.value;
      formValue.quantity = formValue.quantity.toString(); // Convert float to string
      console.log('valid step form', formValue);
      this.data = formValue;
      this.dialogRef.close(formValue);
    } else {
      console.log('invalid step form', this.stepForm.value);
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
