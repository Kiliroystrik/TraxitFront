import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  stats = [
    { label: 'Total Orders', value: 120 },
    { label: 'Vehicles Available', value: 80 },
    { label: 'Drivers Online', value: 60 }
  ];

  recentOrders = [
    { id: 1, client: 'Client A', date: '2024-06-01', status: 'Delivered' },
    { id: 2, client: 'Client B', date: '2024-06-02', status: 'In Transit' },
    { id: 3, client: 'Client C', date: '2024-06-03', status: 'Pending' }
  ];
}
