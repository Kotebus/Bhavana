const { getDefaultConfig } = require('expo/metro-config');

const config = getDefaultConfig(__dirname);

// Добавляем поддержку .md файлов
config.resolver.assetExts.push('md');

module.exports = config;