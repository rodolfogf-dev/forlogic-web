export class ClienteAvaliacao {
    public id!: number;
    public nomeCliente!: number;
    public constructor(init?: Partial<ClienteAvaliacao>) {
      Object.assign(this, init);
    }
    
  }