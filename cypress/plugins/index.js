const cucumber = require('cypress-cucumber-preprocessor').default;
const webpack = require('@cypress/webpack-preprocessor');

module.exports = (on, config) => {
  const options = {
    webpackOptions: require('../../webpack.config'), // Adjust the path as needed
    watchOptions: {}
  };

  on('file:preprocessor', cucumber());
  on('file:preprocessor', webpack(options));

  return config;
};
