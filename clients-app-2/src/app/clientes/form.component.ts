import { Component, OnInit } from '@angular/core';
import { Cliente } from './cliente';
import {ClientService} from './client.service';
import { Router, ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {
   client: Cliente = new Cliente();
   title: string = "Create client";
   errors: string[];
  constructor(public clientService: ClientService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient():void{
    this.activatedRoute.params.subscribe(params => {
      let id = params['id']
      if(id){
        this.clientService.getClient(id).subscribe(
          (client) => this.client = client
        );
      }
    });
  }

  public create():void{
    this.clientService.create(this.client).subscribe(
      client => {
        this.router.navigate(['/clientes'])
        swal("New Client", `Client ${client.name} created correctly`, 'success')
      },
      err=>{
        this.errors = err.error.errors as string[];
        console.error("Error code: " + err.status);
        console.error(err.error.errors);
      }

    );
  }

  update(): void{
    this.clientService.update(this.client).subscribe(
      client => {
        this.router.navigate(['/clientes'])
        swal("Client updated", `Client ${client.name} updated correctly`, 'success')
      },
      err=>{
        this.errors = err.error.errors as string[];
        console.error("Error code: " + err.status);
        console.error(err.error.errors);
      }
    );
  }
}
