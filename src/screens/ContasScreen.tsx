import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useFocusEffect } from "@react-navigation/native";
import React, { useCallback, useState } from "react";
import { FlatList, RefreshControl, Text, View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { ContaItem } from "../components/ContaItem";
import { storageService } from "../storage";
import { Conta, RootStackParamList } from "../types";
import { formatarMoeda } from "../utils";

type ContasScreenProps = {
  navigation: BottomTabNavigationProp<RootStackParamList, "Contas">;
};

export const ContasScreen: React.FC<ContasScreenProps> = ({ navigation }) => {
  const [contas, setContas] = useState<Conta[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const carregarContas = async () => {
    const contasCarregadas = await storageService.getContas();
    setContas(contasCarregadas);
  };

  useFocusEffect(
    useCallback(() => {
      carregarContas();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await carregarContas();
    setRefreshing(false);
  };

  const handleEdit = (conta: Conta) => {
    const rootNativation = navigation.getParent();
    if (rootNativation) {
      navigation.navigate("NovaConta", { conta });
    }
  };

  const handlePress = (conta: Conta) => {
    navigation.navigate("DetalhesConta", { conta });
  };

  useFocusEffect(
    useCallback(() => {
      const rootNavigation = navigation.getParent();
      if (rootNavigation) {
        rootNavigation.setParams({ NovaConta: { conta: undefined } as any });
      }
    }, [navigation])
  );

  const handleDelete = async (id: string) => {
    await storageService.deleteConta(id);
    carregarContas();
  };

  useFocusEffect(
    useCallback(() => {
      navigation.setParams({ conta: undefined } as any);
    }, [navigation])
  );

  const calcularTotais = () => {
    const total = contas.reduce((acc, conta) => acc + conta.valorTotal, 0);
    const pago = contas.reduce((acc, conta) => acc + conta.valorPago, 0);
    return { total, pago };
  };

  const { total, pago } = calcularTotais();

  return (
    <GestureHandlerRootView className="flex-1">
      <View className="flex-1 bg-gray-100">
        <View className="bg-blue-600 pt-12 pb-6 px-4">
          <Text className="text-white text-2xl font-bold mb-4 text-center">
            Contas a Pagar
          </Text>
          <View className="flex-row justify-between">
            <View>
              <Text className="text-blue-200 text-sm">Total</Text>
              <Text className="text-white text-xl font-semibold">
                {formatarMoeda(total)}
              </Text>
            </View>
            <View>
              <Text className="text-blue-200 text-sm">Pago</Text>
              <Text className="text-white text-xl font-semibold">
                {formatarMoeda(pago)}
              </Text>
            </View>
          </View>
        </View>

        {contas.length > 0 && (
          <View className="flex justify-center items-center pt-1">
            <Text className="text-gray-500 text-center text-base">
              Arraste os itens para editar ou excluir.
            </Text>
          </View>
        )}
        {contas.length === 0 ? (
          <View className="flex-1 justify-center items-center px-8">
            <Text className="text-gray-500 text-center text-base">
              Nenhuma conta cadastrada.
            </Text>
          </View>
        ) : (
          <FlatList
            data={contas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ContaItem
                conta={item}
                onEdit={handleEdit}
                onDelete={handleDelete}
                onPress={handlePress}
              />
            )}
            contentContainerStyle={{ paddingTop: 16, paddingBottom: 16 }}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
        )}
      </View>
    </GestureHandlerRootView>
  );
};
