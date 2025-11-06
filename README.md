# contas-app

Um app simples e elegante para controle de gastos pessoais — cadastro de contas, parcelas e acompanhamento dos pagamentos. Feito com Expo + React Native, TypeScript e Tailwind (via NativeWind). Ideal pra quem quer organizar boletos, parcelas e entradas sem dor de cabeça.

---

## Demo rápido
- Tela principal com lista de contas
- Cadastro de nova conta (valor, data, parcelas)
- Visualizar parcelas e marcar como pagas
- Resumo com totais (Total / Pago)

---

## Tecnologias principais
- **Expo** (SDK ~54)  
- **React** 19.x + **React Native** 0.81.5  
- **TypeScript**  
- **NativeWind** + **tailwindcss** para estilos  
- Navegação: **@react-navigation/native** + stacks/tabs  
- Armazenamento local: **@react-native-async-storage/async-storage**

(As dependências e versões estão no `package.json` utilizado no projeto.)

---

## Estrutura do projeto (resumida)
- `App.tsx` — entrada do app  
- `src/screens/` — telas (ContasScreen, NovaContaScreen, DetalhesContaScreen...)  
- `src/components/` — componentes reutilizáveis (ex: `ContaItem.tsx`)  
- `src/storage` — persistência (AsyncStorage)  
- `tailwind.config.js` / `nativewind-env.d.ts` — config do estilo  
- `package.json` — scripts e dependências.

---

## Como rodar (dev)
1. Clone o repositório:
```bash
git clone https://github.com/Victorpb12/contas-app.git
cd contas-app
```

2. Instale dependências:
```bash
npm install
# ou
yarn
```

3. Rode no Expo:
```bash
npm run start
# ou
expo start
```