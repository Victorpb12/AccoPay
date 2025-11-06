import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import { ContasScreen } from "../screens/ContasScreen";
import { DetalhesContaScreen } from "../screens/DetalhesContaScreen";
import { NovaContaScreen } from "../screens/NovaContaScreen";
import { RootStackParamList } from "../types";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

const ContasStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Contas" component={ContasScreen} />
      <Stack.Screen name="DetalhesConta" component={DetalhesContaScreen} />
    </Stack.Navigator>
  );
};

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#2563eb",
          tabBarInactiveTintColor: "#9ca3af",
          tabBarStyle: {
            paddingBottom: 5,
            paddingTop: 5,
            height: 60,
          },
        }}
      >
        <Tab.Screen
          name="ContasTab"
          component={ContasStack}
          options={{
            tabBarLabel: "Contas",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="list" size={size} color={color} />
            ),
          }}
        />
        <Tab.Screen
          name="NovaConta"
          component={NovaContaScreen}
          options={{
            tabBarLabel: "Nova Conta",
            tabBarIcon: ({ color, size }) => (
              <Ionicons name="add-circle" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
