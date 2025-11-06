import AsyncStorage from "@react-native-async-storage/async-storage";
import { Conta } from "../types";

const STORAGE_KEY = "@contas_app:contas";

export const storageService = {
  async getContas(): Promise<Conta[]> {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error("Erro ao carregar contas:", error);
      return [];
    }
  },

  async saveContas(contas: Conta[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(contas));
    } catch (error) {
      console.error("Erro ao salvar contas:", error);
    }
  },

  async addConta(conta: Conta): Promise<void> {
    const contas = await this.getContas();
    contas.push(conta);
    await this.saveContas(contas);
  },

  async updateConta(contaAtualizada: Conta): Promise<void> {
    const contas = await this.getContas();
    const index = contas.findIndex((c) => c.id === contaAtualizada.id);
    if (index !== -1) {
      contas[index] = contaAtualizada;
      await this.saveContas(contas);
    }
  },

  async deleteConta(id: string): Promise<void> {
    const contas = await this.getContas();
    const contasFiltradas = contas.filter((c) => c.id !== id);
    await this.saveContas(contasFiltradas);
  },
};
