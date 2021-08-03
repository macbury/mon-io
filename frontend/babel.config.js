module.exports = function(api) {
  api.cache(true)

  return {
    presets: [
      'module:metro-react-native-babel-preset'
    ],
    plugins: [
      ["@babel/plugin-proposal-decorators", { "legacy": true }],
      'inline-dotenv',
      'babel-plugin-graphql-tag',
      '@babel/plugin-syntax-class-properties'
    ],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    }
  }
}