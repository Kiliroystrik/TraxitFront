import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AddressService } from './services/address.service';
import { debounceTime, switchMap } from 'rxjs/operators';
import { MatFormFieldControl, MatFormFieldModule } from '@angular/material/form-field';
import { MatListItem, MatListModule } from '@angular/material/list';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

@Component({
  selector: 'app-address-autocomplete',
  standalone: true,
  imports: [MatFormFieldModule, MatListModule, ReactiveFormsModule, MatInputModule, MatListItem, MatCardModule, MatAutocompleteModule],
  templateUrl: './address-autocomplete.component.html',
  styleUrl: './address-autocomplete.component.scss'
})
export class AddressAutocompleteComponent {
  searchControl = new FormControl();
  suggestions: any[] = [];

  @Output() addressSelected = new EventEmitter<any>();

  constructor(private addressService: AddressService) { }

  ngOnInit() {
    this.searchControl.valueChanges
      .pipe(
        debounceTime(300), // Attendre 300ms après la dernière frappe
        switchMap(value => this.addressService.searchAddress(value)) // Changer le flux pour l'appel API
      )
      .subscribe(results => this.suggestions = results);
  }

  onSelectSuggestion(suggestion: any) {
    this.addressSelected.emit(suggestion);
    this.suggestions = []; // Vider les suggestions après la sélection
  }
}
