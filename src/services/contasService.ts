import { Conta } from "../types";
import { supabase } from "./authService";

export const contasService = {
  async getContas(): Promise<Conta[]> {
    try {
      const { data, error } = await supabase
        .from("contas")
        .select(
          `
          *,
          parcelas (*)
        `
        )
        .order("created_at", { ascending: false });

      if (error) throw error;

      return (data || []).map((conta: any) => ({
        id: conta.id,
        titulo: conta.titulo,
        descricao: conta.descricao || "",
        valorTotal: parseFloat(conta.valor_total),
        valorPago: parseFloat(conta.valor_pago),
        temParcelas: conta.tem_parcelas,
        quantidadeParcelas: conta.quantidade_parcelas,
        valorParcela: parseFloat(conta.valor_parcela),
        parcelas: (conta.parcelas || []).map((p: any) => ({
          numero: p.numero,
          valor: parseFloat(p.valor),
          paga: p.paga,
          dataPagamento: p.data_pagamento,
          dataVencimento: p.data_vencimento,
        })),
        dataCriacao: conta.data_criacao,
      }));
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
      return [];
    }
  },

  async addConta(conta: Omit<Conta, "id">): Promise<void> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) throw new Error("Usuário não autenticado");

      // Inserir conta
      const { data: contaData, error: contaError } = await supabase
        .from("contas")
        .insert({
          user_id: user.id,
          titulo: conta.titulo,
          descricao: conta.descricao,
          valor_total: conta.valorTotal,
          valor_pago: conta.valorPago,
          tem_parcelas: conta.temParcelas,
          quantidade_parcelas: conta.quantidadeParcelas,
          valor_parcela: conta.valorParcela,
          data_criacao: conta.dataCriacao,
        })
        .select()
        .single();

      if (contaError) throw contaError;

      // Inserir parcelas se houver
      if (conta.parcelas && conta.parcelas.length > 0) {
        const parcelasData = conta.parcelas.map((p) => ({
          conta_id: contaData.id,
          numero: p.numero,
          valor: p.valor,
          paga: p.paga,
          data_pagamento: p.dataPagamento,
          data_vencimento: p.dataVencimento,
        }));

        const { error: parcelasError } = await supabase
          .from("parcelas")
          .insert(parcelasData);

        if (parcelasError) throw parcelasError;
      }
    } catch (error) {
      console.error("Erro ao adicionar conta:", error);
      throw error;
    }
  },

  async updateConta(conta: Conta): Promise<void> {
    try {
      // Atualizar conta
      const { error: contaError } = await supabase
        .from("contas")
        .update({
          titulo: conta.titulo,
          descricao: conta.descricao,
          valor_total: conta.valorTotal,
          valor_pago: conta.valorPago,
          tem_parcelas: conta.temParcelas,
          quantidade_parcelas: conta.quantidadeParcelas,
          valor_parcela: conta.valorParcela,
        })
        .eq("id", conta.id);

      if (contaError) throw contaError;

      // Deletar parcelas antigas
      await supabase.from("parcelas").delete().eq("conta_id", conta.id);

      // Inserir parcelas atualizadas
      if (conta.parcelas && conta.parcelas.length > 0) {
        const parcelasData = conta.parcelas.map((p) => ({
          conta_id: conta.id,
          numero: p.numero,
          valor: p.valor,
          paga: p.paga,
          data_pagamento: p.dataPagamento,
          data_vencimento: p.dataVencimento,
        }));

        const { error: parcelasError } = await supabase
          .from("parcelas")
          .insert(parcelasData);

        if (parcelasError) throw parcelasError;
      }
    } catch (error) {
      console.error("Erro ao atualizar conta:", error);
      throw error;
    }
  },

  async deleteConta(id: string): Promise<void> {
    try {
      // As parcelas serão deletadas automaticamente por CASCADE
      const { error } = await supabase.from("contas").delete().eq("id", id);

      if (error) throw error;
    } catch (error) {
      console.error("Erro ao deletar conta:", error);
      throw error;
    }
  },
};
