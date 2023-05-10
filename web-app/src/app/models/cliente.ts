export class Cliente {
  public id!: number;
  public nomeCliente!: string;
  public nomeContato!: string;
  public cnpj!: string;

  public constructor(init?: Partial<Cliente>) {
    Object.assign(this, init);
  }
  
}
