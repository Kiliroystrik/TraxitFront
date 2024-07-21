import { Component } from '@angular/core';
import { ClientListComponent } from "../../features/client/components/client-list/client-list.component";

@Component({
  selector: 'app-client-managment',
  standalone: true,
  imports: [ClientListComponent],
  templateUrl: './client-managment.component.html',
  styleUrl: './client-managment.component.scss'
})
export class ClientManagmentComponent {

}
