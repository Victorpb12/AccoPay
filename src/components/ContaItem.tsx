import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
  Alert,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Swipeable from "react-native-gesture-handler/ReanimatedSwipeable";
import Animated from "react-native-reanimated";
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

  const renderRightActions = (progress: any, dragX: any) => {
    const trans1 = dragX.interpolate
      ? dragX.interpolate({
          inputRange: [-120, -30, 0],
          outputRange: [0, -10, 0],
          extrapolate: "clamp",
        })
      : 0;

    const scale1 = progress.interpolate
      ? progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.95, 1],
          extrapolate: "clamp",
        })
      : 1;

    const trans2 = dragX.interpolate
      ? dragX.interpolate({
          inputRange: [-160, -60, 0],
          outputRange: [0, -5, 0],
          extrapolate: "clamp",
        })
      : 0;

    const scale2 = progress.interpolate
      ? progress.interpolate({
          inputRange: [0, 1],
          outputRange: [0.9, 1],
          extrapolate: "clamp",
        })
      : 1;

    return (
      <View style={styles.actionsContainer}>
        <Animated.View
          style={[
            styles.actionWrapper,
            { transform: [{ translateX: trans2 }, { scale: scale2 }] },
          ]}
        >
          <TouchableOpacity
            accessibilityLabel="Editar conta"
            activeOpacity={0.85}
            onPress={() => onEdit(conta)}
            style={[styles.actionButton, styles.editButton]}
          >
            <Ionicons name="create-outline" size={20} color="#ffffff" />
            <Text style={styles.actionText}>Editar</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View
          style={[
            styles.actionWrapper,
            { transform: [{ translateX: trans1 }, { scale: scale1 }] },
          ]}
        >
          <TouchableOpacity
            accessibilityLabel="Excluir conta"
            activeOpacity={0.85}
            onPress={confirmarExclusao}
            style={[styles.actionButton, styles.deleteButton]}
          >
            <Ionicons name="trash-outline" size={20} color="#ffffff" />
            <Text style={styles.actionText}>Excluir</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    );
  };

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

const styles = StyleSheet.create({
  actionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 12,
  },
  actionWrapper: {
    marginLeft: 8,
  },
  actionButton: {
    width: 84,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: Platform.OS === "android" ? 0.25 : 0.12,
    shadowRadius: 6,
    elevation: 6,
    flexDirection: "row",
    gap: 8,
  },
  editButton: {
    backgroundColor: "#2563eb",
  },
  deleteButton: {
    backgroundColor: "#ef4444",
  },
  actionText: {
    color: "#fff",
    fontWeight: "600",
    marginLeft: 8,
    fontSize: 13,
  },
});
