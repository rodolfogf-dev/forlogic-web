import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Avaliacao } from 'src/app/models/avaliacao';
import { AvaliacaoService } from 'src/app/services/avaliacao/avaliacao.service';
import { Observable, Subject, debounceTime, distinctUntilChanged, lastValueFrom, switchMap } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import { ClienteService } from 'src/app/services/cliente/cliente.service';
import { ClienteAvaliacao } from 'src/app/models/cliente-avaliacao';

@Component({
  selector: 'app-avaliacao-form',
  templateUrl: './avaliacao-form.component.html',
  styleUrls: ['./avaliacao-form.component.css']
})
export class AvaliacaoFormComponent implements OnInit {
  avaliacao: Avaliacao | undefined;

  clientes$!: Observable<Cliente[]>;
  clientesParaAdicionarAvaliacao!: Observable<ClienteAvaliacao[]>;
  private searchTerms = new Subject<string>();

  avaliacaoFormGroup: FormGroup;
  private novaAvaliacao: Avaliacao = new Avaliacao();

  constructor(
    private route: ActivatedRoute,
    private avaliacaoService: AvaliacaoService,
    private clienteService: ClienteService,
    private location: Location,
    private fb: FormBuilder
  ) {

    this.avaliacaoFormGroup = this.fb.group({
      nomeCliente: new FormControl(''),
      nomeContato: new FormControl(''),
      cnpj: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.clientes$ = this.searchTerms.pipe(
      // wait 300ms after each keystroke before considering the term
      debounceTime(300),

      // ignore new term if same as previous term
      distinctUntilChanged(),

      // switch to new search observable each time the term changes
      switchMap((term: string) => this.clienteService.pesquisarClientes(term)),
    );
  }
  // Push a search term into the observable stream.
  search(term: string): void {
    this.searchTerms.next(term);
  }

  voltar(): void {
    this.location.back();
  }

  async salvarAvaliacao() {
    let novaAvaliacao = new Avaliacao(this.avaliacaoFormGroup.value);
  }

  add(name: number): void {
    // name = name.trim();
    // if (!name) { return; }
    // this.clienteService.addHero({ name } as Hero)
    //   .subscribe(hero => {
    //     this.heroes.push(hero);
    //   });
  }

  delete(cliente: ClienteAvaliacao): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    // this.heroService.deleteHero(hero.id).subscribe();
  }

}
