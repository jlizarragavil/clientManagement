import { Injectable } from '@angular/core';
import { Cliente } from './cliente';
import { of,Observable, throwError } from 'rxjs';
import { map,catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import swal from 'sweetalert2';
import { Router } from '@angular/router';

@Injectable()
export class ClientService {
  private urlEndpoint:string = 'http://localhost:8080/api/clients';
  private httpHeaders = new HttpHeaders({'Content-type': 'application/json'})
  constructor(private http: HttpClient, private router: Router) { }
  getClientes(): Observable<Cliente[]>{
    return this.http.get<Cliente[]>(this.urlEndpoint);
  }
  create(cliente: Cliente) : Observable<Cliente>{
    return this.http.post(this.urlEndpoint, cliente, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.response as Cliente),
      catchError(e =>{
        console.error(e.error.message);
        swal(e.error.message, e.error.error, "error");
        return throwError(e);
      })
    );
  }

  getClient(id: number): Observable<Cliente>{
    return this.http.get<Cliente>(`${this.urlEndpoint}/${id}`).pipe(
      catchError(e =>{
        this.router.navigate(['/clientes']);
        console.error(e.error.message);
        swal("Error", e.error.message, "error");
        return throwError(e);
      })
    );
  }

  update(cliente: Cliente): Observable<Cliente>{
      return this.http.put(`${this.urlEndpoint}/${cliente.id}`, cliente,{headers: this.httpHeaders}).pipe(
        map((response: any) => response.client as Cliente),
        catchError(e =>{
          console.error(e.error.message);
          swal(e.error.message, e.error.error, "error");
          return throwError(e);
        })
      );
  }

  deleteClient(id: number): Observable<Cliente>{
    return this.http.delete<Cliente>(`${this.urlEndpoint}/${id}`, {headers: this.httpHeaders}).pipe(
      catchError(e =>{
        console.error(e.error.message);
        swal(e.error.message, e.error.error, "error");
        return throwError(e);
      })
    );
  }
}
