import { Component, OnInit } from '@angular/core';
import { ClientService } from '../../services/client.service';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { Client } from '../../interfaces/client';
import { CrudListComponent } from "../../../../shared/components/crud/crud-list/crud-list.component";

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [DatePipe, CrudListComponent],
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss'],
  providers: [DatePipe]
})
export class ClientListComponent implements OnInit {
  clients: any[] = []; // Utilisation de l'interface Client
  displayFields = [
    { title: 'ID', field: 'id' },
    { title: 'name', field: 'name' },
    { title: 'email', field: 'email' },
    { title: 'phone', field: 'phone' },
    { title: 'createdAt', field: 'createdAt' },
    { title: 'updatedAt', field: 'updatedAt' },
    { title: 'company', field: 'company' },
    { title: 'address', field: 'address' },
  ];

  constructor(private clientService: ClientService, private datePipe: DatePipe, private router: Router) { }

  ngOnInit(): void {
    this.getClients();
  }

  getClients(): void {
    this.clientService.getClients().pipe(
      map(clients => clients.map(client => ({
        ...client,
        createdAt: client.createdAt ? this.datePipe.transform(client.createdAt, 'dd/MM/yyyy') : null,
        updatedAt: client.updatedAt ? this.datePipe.transform(client.updatedAt, 'dd/MM/yyyy') : null,
      })))
    ).subscribe(transformedClients => {
      this.clients = transformedClients;
    });
  }

  addClient(): void {
    const newClient: Client = {
      createdAt: new Date(),
      updatedAt: new Date(),
      name: 'New Client',
      email: 'client@example.com',
      phone: '123-456-7890',
      company: '/api/companies/1', // replace with actual company API resource identifier
      address: '123 Main St',
      orders: []
    };
    this.clientService.createClient(newClient).subscribe((client) => {
      this.clients.push(client);
    });
  }

  onView(client: Client): void {
    this.router.navigate(['/gestion-des-clients', client.id]);  // Redirige vers la page de détails
  }

  onEdit(client: Client): void {
    console.log('Edit client', client);
  }

  onDelete(client: Client): void {
    console.log('Delete client', client);
  }
}
