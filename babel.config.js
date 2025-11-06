// babel.config.js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // garante que JSX import source aponte pro nativewind
      ['babel-preset-expo', { jsxImportSource: 'nativewind' }],
      // nativewind como PRESET (não em plugins)
      'nativewind/babel'
    ],
    plugins: [
      // reanimated precisa estar aqui
      'react-native-reanimated/plugin',
      // se usar expo-router, habilite também:
      // 'expo-router/babel'
    ],
  };
};
