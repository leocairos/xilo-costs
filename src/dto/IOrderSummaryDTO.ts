export interface IOrderSummary {
  ProdOP: string;
  CC: string;
  AnoMes: string;
  CF: string;
  TM: string;
  Produto: string;
  Descricao: string;
  Tipo: string;
  Qtde: number;
  CustUnit: number;
  CustoTotal: number;
  Material: number;
  MaoDeObra: number;
  GGF: number;
  OrigPerda: string;
  DestPerda: string;
  QtdePerda: number;
  composition?: IOrderSummary[];
}
