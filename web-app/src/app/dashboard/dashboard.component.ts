import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';
import { ClienteService } from '../services/cliente/cliente.service';
import { Cliente } from '../models/cliente';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  clientes: Cliente[] = [];
  constructor(private clienteService: ClienteService) { }

  ngOnInit(): void {
    this.getClientes();
  }

  getClientes(): void{
    this.clienteService.obterTodosClientes()
      .subscribe(clientes => {
        this.clientes = clientes;
        console.log(clientes);
      });

  }
}
