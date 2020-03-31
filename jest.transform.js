module.exports = require('babel-jest').createTransformer({
  presets: ['@babel/preset-env', '@babel/react'],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        regenerator: true,
      },
    ],
  ],
});
