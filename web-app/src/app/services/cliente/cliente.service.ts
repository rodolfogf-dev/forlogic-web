import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Cliente } from '../../models/cliente';
import { MessageService } from '../../message.service';


@Injectable({ providedIn: 'root' })
export class ClienteService {

  private clienteApiUrl = 'https://localhost:7266/api/Cliente';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET hero by id. Will 404 if id not found */
  obterTodosClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.clienteApiUrl)
      .pipe(
        tap(_ => this.log('fetched clientes')),
        catchError(this.handleError<Cliente[]>('obterTodosClientes', []))
      );
  }

  checarCpnjExistente(cnpj: string): Observable<any> {
    const url = `${this.clienteApiUrl}/obter-por-cnpj/${cnpj}`;
    return this.http.get<Cliente>(url)
      .pipe(
        tap(_ => this.log('fetched clientes')),
        catchError(this.handleError<Cliente>('checarCpnjExistente'))
      );
  }

  pesquisarClientes(term: string): Observable<Cliente[]> {
    if (!term.trim()) {
      // if not search term, return empty array.
      return of([]);
    }
    return this.http.get<Cliente[]>(`${this.clienteApiUrl}/pesquisar-por-nome/${term}`).pipe(
      tap(x => x.length ?
        this.log(`found heroes matching "${term}"`) :
        this.log(`no heroes matching "${term}"`)),
      catchError(this.handleError<Cliente[]>('pesquisarClientes', []))
    );
  }

  /** POST: add a new hero to the server */
  adicionarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.clienteApiUrl, cliente, this.httpOptions).pipe(
      tap((novoCliente: Cliente) => this.log(`Cliente adicionado com id=${novoCliente.id}`)),
      catchError(this.handleError<any>('adicionarCliente'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a HeroService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }
}
