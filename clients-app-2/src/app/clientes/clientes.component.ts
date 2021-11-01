import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import {ClientService} from './client.service';
import swal from 'sweetalert2';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html'
})
export class ClientesComponent implements OnInit {
  clients: Cliente[];
  paginator: any;
  declare swal:any;
  constructor(private clientService: ClientService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = +params.get('page');
      if(!page){
        page = 0;
      }
      this.clientService.getClientes(page)
      .pipe(
        tap(response =>{
          (response.content as Cliente[]).forEach( cliente =>
            console.log(cliente.name)
          );
        })
      )
      .subscribe(response => {
        this.clients = response.content as Cliente[];
        this.paginator = response;
      });
    });
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
