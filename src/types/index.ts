export interface Parcela {
  numero: number;
  valor: number;
  paga: boolean;
  dataPagamento?: string;
  dataVencimento?: string;
}

export interface Conta {
  id: string;
  titulo: string;
  descricao: string;
  valorTotal: number;
  valorPago: number;
  temParcelas: boolean;
  quantidadeParcelas: number;
  valorParcela: number;
  parcelas: Parcela[];
  dataCriacao: string;
}

export type RootStackParamList = {
  Contas: undefined;
  NovaConta: { conta?: Conta } | undefined;
  DetalhesConta: { conta: Conta };
};
