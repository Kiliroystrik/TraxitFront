import { TourService } from '../../services/tour.service';
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { map, Subscription } from 'rxjs';
import { Tour } from '../../interfaces/tour';
import { TourStepService } from '../../../tour-step/services/tour-step.service';
import { TourStep } from '../../../tour-step/interfaces/tourstep';
import { MatList, MatListModule } from '@angular/material/list';
import { LeafletModule } from '@bluehalo/ngx-leaflet';
import { latLng, tileLayer, MapOptions, Marker, marker, icon, Map } from 'leaflet';
import { MatCardModule } from '@angular/material/card';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs';
import { MatButtonModule } from '@angular/material/button';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTableModule } from '@angular/material/table';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatChipsModule } from '@angular/material/chips';
import { StatusColorDirective } from '../../../../shared/directives/status-color.directive';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-tour-details',
  standalone: true,
  imports: [
    MatDialogModule, MatFormFieldModule, MatTableModule, MatSelectModule, MatInputModule, MatButtonModule, MatTabsModule, MatIconModule, MatCardModule, DatePipe, MatListModule, MatGridListModule, MatChipsModule, CdkDropList, CdkDrag, StatusColorDirective, LeafletModule
  ],
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.scss'],
  providers: [DatePipe],
})
export class TourDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('mapContainer') mapContainer: ElementRef;
  tour: any | null = null;
  tourSteps: TourStep[] = null;
  selectedStep: TourStep | null = null;
  private tourSubscription: Subscription | null = null;
  private tourStepSubscription: Subscription | null = null;
  options: MapOptions;
  markers: Marker[] = [];
  isEditMode = false;
  map: Map;

  constructor(
    private route: ActivatedRoute,
    private tourService: TourService,
    private datePipe: DatePipe,
    private tourStepService: TourStepService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.getTour(id);
    }

    this.initializeMapOptions();
  }

  ngAfterViewInit(): void {
    window.addEventListener('resize', () => {
      if (this.map) {
        this.map.invalidateSize();
      }
    });
  }

  ngOnDestroy(): void {
    if (this.tourSubscription) {
      this.tourSubscription.unsubscribe();
    }
    window.removeEventListener('resize', () => {
      if (this.map) {
        this.map.invalidateSize();
      }
    });
  }

  getTour(id: string): void {
    this.tourSubscription = this.tourService.getTour(id).pipe(
      map(tour => ({
        ...tour,
        startDate: tour.startDate ? this.datePipe.transform(tour.startDate, 'dd/MM/yyyy') : null,
        endDate: tour.endDate ? this.datePipe.transform(tour.endDate, 'dd/MM/yyyy') : null,
        createdAt: tour.createdAt ? this.datePipe.transform(tour.createdAt, 'dd/MM/yyyy') : null,
        updatedAt: tour.updatedAt ? this.datePipe.transform(tour.updatedAt, 'dd/MM/yyyy') : null,
      }))
    ).subscribe({
      next: (tour) => {
        this.tour = tour;
        this.getTourStepsByTour(tour.id);
      },
      error: (error) => {
        console.error('Error retrieving tour:', error);
      },
    });
  }

  getTourStepsByTour(id: number): void {
    this.tourStepSubscription = this.tourStepService.getTourStepsByTour(id).subscribe({
      next: (tourSteps) => {
        console.log(tourSteps.items);
        this.tourSteps = tourSteps.items;
        this.addMarkers();
      },
      error: (error) => {
        console.error('Error retrieving tour steps:', error);
      },
    });
  }

  initializeMapOptions(): void {
    this.options = {
      layers: [
        tileLayer('https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png', {
          maxZoom: 18,
          minZoom: 2,
          attribution: 'Map data © OpenStreetMap contributors, Tiles style by OpenStreetMap France'
        })
      ],
      zoom: 6, // Niveau de zoom plus adapté à une vue générale de la France
      center: latLng(46.603354, 1.888334) // Coordonnées approximatives du centre de la France
    };
  }

  addMarkers(): void {
    if (this.tourSteps.length > 0) {
      this.markers = this.tourSteps
        .filter(step => step.orderStep && step.orderStep.address) // Ensure there is an orderStep with an address
        .map(step => {
          const { latitude, longitude, street } = step.orderStep.address;
          const newMarker = marker([+latitude, +longitude], {
            icon: icon({
              iconUrl: 'assets/marker.svg',
              iconSize: [25, 41],
              iconAnchor: [12, 41],
              popupAnchor: [1, -34],
            }),
          });

          // Attachez la popup au marqueur
          newMarker.bindPopup(street).on('click', () => {
            this.onSelectTourStep(step); // Appelle onSelectTourStep lorsqu'on clique sur le marqueur
          });

          return newMarker;
        });

      this.markers.forEach(m => m.addTo(this.map)); // Ajoute tous les marqueurs à la carte
    }
  }

  onSelectTourStep(selectedTourStep: TourStep): void {
    this.selectedStep = this.selectedStep === selectedTourStep ? null : selectedTourStep;

    if (this.selectedStep && this.selectedStep.orderStep && this.selectedStep.orderStep.address) {
      const { latitude, longitude } = this.selectedStep.orderStep.address;
      this.map.panTo([+latitude, +longitude]); // Recentrer la carte sur l'étape sélectionnée sans changer le zoom
      const selectedMarker = this.markers.find(m => m.getLatLng().lat === +latitude && m.getLatLng().lng === +longitude);
      if (selectedMarker) {
        selectedMarker.openPopup(); // Ouvre la popup du marqueur sélectionné
      }
    }
  }



  selectStep(step: TourStep): void {
    this.selectedStep = this.selectedStep === step ? null : step;
  }

  toggleEditPosition(): void {
    // if (this.isEditMode) {
    //   this.tourSteps.forEach((step, index) => {
    //     step.position = index;
    //     this.updateTourStep(step);
    //   });
    //   this.isEditMode = !this.isEditMode;
    // } else {
    //   this.isEditMode = !this.isEditMode;
    // }
  }

  cancelEditPosition(): void {
    this.isEditMode = false;
    // On remet au tableau l'ordre initial
    // this.getTourStepsByOrder(this.order.id.toString());
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tourSteps, event.previousIndex, event.currentIndex);
  }

  onTabChange(event: MatTabChangeEvent) {
    if (event.index === 1) { // Assumant que l'onglet 1 est celui avec la carte
      this.cdr.detectChanges();
      setTimeout(() => {
        if (this.map) {
          this.map.invalidateSize();
        }
      }, 300); // Vous pouvez ajuster le délai si nécessaire
    }
  }

  onMapReady(map: Map) {
    this.map = map;
    setTimeout(() => {
      this.map.invalidateSize();
    }, 300); // Vous pouvez ajuster le délai si nécessaire
  }
}
