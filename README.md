# Welcome to ChalkPad
<div style="text-align: justify;">
  ChalkPad is a minimalistic, interactive ed-tech platform built specifically for primary school teachers and students. It focuses on simple, distraction-free learning, allowing teachers to create and present lessons easily while helping students understand concepts through interactive and engaging content. ChalkPad emphasizes clarity, accessibility, and effective learning rather than complexity, making classroom teaching more intuitive and enjoyable for young learners.
</div>

## Get started
1. Clone Repository:
```bash
git clone https://github.com/rakukanteki/ChalkPad.git
cd ChalkPad
```
2. Install dependencies
```bash
npm install
```
3. Start the app
```bash
npx expo start
```
4. Install these libraries:
```bash
npx tailwindcss init
npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context
npm install @google/generative-ai
npx expo install expo-web-browser expo-clipboard
npm install firebase
npm i @react-native-async-storage/async-storage
npm install -g firebase-tools
npx expo install @react-native-firebase/app @react-native-firebase/auth
npx expo install expo-build-properties
```
## Setup Native Wind and Typescript.
- `tailwind.config.js` file:
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
- `globals.css` file:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```
- `babel.config.js` file:
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
- `metro.config.js` file:
```js
const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require('nativewind/metro');
 
const config = getDefaultConfig(__dirname)
 
module.exports = withNativeWind(config, { input: './app/globals.css' })
```
- `nativewind-env.d.ts` file:
```ts
/// <reference types="nativewind/types"/>
```

## Contact Developer:
`e-mail:` radwankhondokar20@gmail.com