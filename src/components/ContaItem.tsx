import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import { Conta } from "../types";
import { formatarMoeda } from "../utils";

interface ContaItemProps {
  conta: Conta;
  onEdit: (conta: Conta) => void;
  onDelete: (id: string) => void;
  onPress: (conta: Conta) => void;
}

export const ContaItem: React.FC<ContaItemProps> = ({
  conta,
  onEdit,
  onDelete,
  onPress,
}) => {
  const confirmarExclusao = () => {
    Alert.alert(
      "Excluir Conta",
      `Deseja realmente excluir "${conta.titulo}"?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: () => onDelete(conta.id),
        },
      ]
    );
  };

  const renderRightActions = () => (
    <View className="flex-row">
      <TouchableOpacity
        className="bg-blue-500 justify-center items-center w-20"
        onPress={() => onEdit(conta)}
      >
        <Text className="text-white font-semibold">Editar</Text>
      </TouchableOpacity>
      <TouchableOpacity
        className="bg-red-500 justify-center items-center w-20"
        onPress={confirmarExclusao}
      >
        <Text className="text-white font-semibold">Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableOpacity onPress={() => onPress(conta)}>
        <View className="bg-white p-4 mb-2 mx-4 rounded-lg shadow-sm">
          <Text className="text-lg font-semibold text-gray-800">
            {conta.titulo}
          </Text>

          <View className="flex-row justify-between mt-2">
            <View>
              <Text className="text-gray-600 text-sm">Valor Total</Text>
              <Text className="text-green-600 font-semibold">
                {formatarMoeda(conta.valorTotal)}
              </Text>
            </View>
            <View>
              <Text className="text-gray-600 text-sm">Valor Pago</Text>
              <Text className="text-blue-600 font-semibold">
                {formatarMoeda(conta.valorPago)}
              </Text>
            </View>
          </View>

          {conta.temParcelas && (
            <Text className="text-gray-500 text-xs mt-2">
              {conta.quantidadeParcelas}x de {formatarMoeda(conta.valorParcela)}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    </Swipeable>
  );
};
