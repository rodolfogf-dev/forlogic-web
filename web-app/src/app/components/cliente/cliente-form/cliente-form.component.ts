import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { lastValueFrom } from 'rxjs';

import { Cliente } from '../../../models/cliente';
import { ClienteService } from '../../../services/cliente/cliente.service';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit {
  cliente: Cliente | undefined;

  clienteFormGroup: FormGroup;
  private novoCliente: Cliente = new Cliente();

  constructor(
    private route: ActivatedRoute,
    private clienteService: ClienteService,
    private location: Location,
    private fb: FormBuilder
  ) {

    this.clienteFormGroup = this.fb.group({
      nomeCliente: new FormControl(''),
      nomeContato: new FormControl(''),
      cnpj: new FormControl('')
    });

  }

  ngOnInit(): void {
  }

  voltar(): void {
    this.location.back();
  }

  async salvarCliente() {
    let novoCliente = new Cliente(this.clienteFormGroup.value);
    var clienteEncontrado = await lastValueFrom(this.clienteService.checarCpnjExistente(novoCliente.cnpj));
    console.log(clienteEncontrado);
    if (clienteEncontrado == null) {
      this.clienteService.adicionarCliente(novoCliente)
        .subscribe(() => this.voltar());
    }else{
      alert("Já existe cliente cadastrado com este cnpj");
    }
  }
}
