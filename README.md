# ChalkPad:
A simple and teacher-friendly educational upto-date AI app designed for rural schools. Users can select a `Class → Subject → Chapter → Content` in a clear step-by-step flow, making it easy for teachers and students to access syllabus-based learning materials without complex tools.

## PROJECT AND ENVIRONMENT SETUP
1. Install NodeJs.
2. Create an EXPO project: `npx create-expo-app@latest ./` in the terminal.
3. To delete the unnecessary huge codes: `npm run rest-project`
4. Start the development server: `npx expo start` [IMPORTANT: MAKE SURE YOUR PHONE AND LAPTOP/PC ARE CONNECTED TO THE SAME WIFI.]
5. For making the styling easier run: `npm install nativewind tailwindcss react-native-reanimated react-native-safe-area-context`
6. Initialize tailwind css: `npx tailwindcss init`
7. Update the tailwind.config.js:
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
8. Create a `globals.css` file and paste this:
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```
9. Create a `babel.config.js` file in the root directory and paste this:
```
module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", {jsxImportSource: "nativewind"}],
            "nativewind/babel",
        ],
    };
};
```
10. Create a new file `metro.config.js`, run this in terminal to create: `npx expo customize metro.config.js`. Then paste this:
```
const {getDefaultConfig} = require("expo/metro-config");
const {withNativeWind} = require("nativewind/metro");

const config = getDefaultConfig(__dirname)

module.exports = withNativeWind(config, {input: './app/globals.css'})
```
11. Import `global.css` in the `app/_layout.tsx`: `import './globals.css';`
12. Create a new file in the root dir named `nativewind-env.d.ts` and paste this: `/// <reference types="nativewind/types"/>`. This enables TypeScripts to recognize the tailwindcss classes. (Prevents errors)