import { Injectable } from '@angular/core';
import { CLIENTES } from './clientes.json';
import { Cliente } from './cliente';
import { of,Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class ClientService {
  private urlEndpoint:string = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})
  constructor(private http: HttpClient) { }
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndpoint);
  }
  create(cliente: Cliente) : Observable<Cliente>{
    return this.http.post<Cliente>(this.urlEndpoint, cliente, {headers: this.httpHeaders});
  }

  getClient(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`);
  }

  update(cliente: Cliente): Observable<Cliente>{
      return this.http.put<Cliente>(`${this.urlEndpoint}/${cliente.id}`, cliente,{headers: this.httpHeaders});
  }

  deleteClient(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders});
  }
}
