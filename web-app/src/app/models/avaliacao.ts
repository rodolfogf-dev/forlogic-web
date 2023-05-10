export class Avaliacao {
    public id!: number;
    public dataPeriodo!: Date;
  
    public constructor(init?: Partial<Avaliacao>) {
      Object.assign(this, init);
    }
    
  }