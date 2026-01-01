1. Create project:
```bash
npx create-expo-app@latest ./
```
2. Open-up the app:
```bash
npx expo start
```
3. Reset the project:
```bash
npm run reset-project
```
4. Install UI Packages:
```bash
npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
```
```bash
npx tailwindcss init
```
Then paste:
```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: ["./App.tsx", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
5. Create `globals.css` in app:
```js
@tailwind base;
@tailwind components;
@tailwind utilities;
```
6. Create `babel.config.js`:
```js
module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      "nativewind/babel",
    ],
  };
};
```
7. Initialize `metro.config.js` -> `npx expo customize metro.config.js`, then paste:
```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
 
module.exports = withNativeWind(config, { input: './app/globals.css' })
```
8. Create `nativewind-env.d.ts` file, then paste:
```js
/// <reference types="nativewind/types"/>
```


# REQUIRMENTS:
```requirments.txt
npx tailwindcss init
npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
npm install @google/generative-ai
npx expo install expo-web-browser expo-clipboard