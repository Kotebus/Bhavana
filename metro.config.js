const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Adding .md files support
config.resolver.assetExts.push('md');

module.exports = config;