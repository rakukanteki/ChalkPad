#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read splash configuration
const splashConfig = (await import('../splash.config.js')).default;

// Read current app.json
const appJsonPath = path.join(__dirname, '..', 'app.json');
let appJson = JSON.parse(fs.readFileSync(appJsonPath, 'utf8'));

// Update splash configuration in app.json
appJson.expo.splash = {
    image: splashConfig.image,
    resizeMode: splashConfig.resizeMode,
    backgroundColor: splashConfig.backgroundColor
};

// Update iOS splash
if (appJson.expo.ios) {
    appJson.expo.ios.splash = {
        image: splashConfig.ios?.image || splashConfig.image,
        resizeMode: splashConfig.ios?.resizeMode || splashConfig.resizeMode
    };
}

// Update Android adaptive icon background
if (appJson.expo.android) {
    appJson.expo.android.adaptiveIcon.backgroundColor = splashConfig.android?.backgroundColor || splashConfig.backgroundColor;
}

// Update expo-splash-screen plugin
const splashPluginIndex = appJson.expo.plugins.findIndex(plugin =>
    Array.isArray(plugin) && plugin[0] === 'expo-splash-screen'
);

if (splashPluginIndex !== -1) {
    appJson.expo.plugins[splashPluginIndex][1] = {
        image: splashConfig.image,
        imageWidth: splashConfig.imageWidth,
        resizeMode: splashConfig.resizeMode,
        backgroundColor: splashConfig.backgroundColor
    };
}

// Write updated app.json
fs.writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));

console.log('✅ app.json updated from splash.config.js');