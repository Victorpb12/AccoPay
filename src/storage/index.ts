import { contasService } from "../services/contasService";
import { Conta } from "../types";

// Agora usa Supabase ao invés de AsyncStorage local
export const storageService = {
  async getContas(): Promise<Conta[]> {
    return await contasService.getContas();
  },

  async saveContas(contas: Conta[]): Promise<void> {
    // Não usado mais, mas mantido para compatibilidade
    console.warn("saveContas não é usado com Supabase");
  },

  async addConta(conta: Conta): Promise<void> {
    await contasService.addConta(conta);
  },

  async updateConta(contaAtualizada: Conta): Promise<void> {
    await contasService.updateConta(contaAtualizada);
  },

  async deleteConta(id: string): Promise<void> {
    await contasService.deleteConta(id);
  },
};
