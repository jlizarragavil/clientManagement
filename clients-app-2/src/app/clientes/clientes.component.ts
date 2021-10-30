import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import {ClientService} from './client.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clients: Cliente[];
  declare swal:any;
  constructor(private clientService: ClientService) { }

  ngOnInit(): void {
    this.clientService.getClientes()
    .pipe(
      tap(clients =>{
        this.clients = clients;
      })
    )
    .subscribe();
  }
  delete(client: Cliente): void{
    swal({
        title: 'Are you sure?',
        text: `Do you want to delete ${client.name} ${client.lastName}?`,
        type: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.value) {

          this.clientService.deleteClient(client.id).subscribe( response => {
                this.clients = this.clients.filter(clie => clie !== client);
                swal('Deleted!','Your file has been deleted.','success');
           });

        }
      });
  }

}
