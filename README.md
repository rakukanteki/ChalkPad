# ChalkPad:
A simple and teacher-friendly educational upto-date AI app designed for rural schools. Users can select a `Class → Subject → Chapter → Content` in a clear step-by-step flow, making it easy for teachers and students to access syllabus-based learning materials without complex tools.

## 🚀 PERFORMANCE FEATURES

### Global Font Eager Loading
- **All fonts are loaded globally** when the app starts in `_layout.tsx`
- **No font loading delays** or flash of unstyled text (FOUT)
- **Available fonts:**
  - `Kalpurush` - Primary Bangla font
  - `Kalpurush-Bold` - Bold Bangla font
  - `SpaceMono-Regular` - Monospace font for code/technical content
- **Loading states** prevent app rendering until fonts are ready
- **Error handling** for font loading failures

### TypeScript Organization
- **Centralized type definitions** in `/types/` directory
- **Clean separation** of types from components
- **Proper imports** using `@/` alias for consistency
- **No route conflicts** - type files don't interfere with Expo Router

## 📱 DEMO FEATURES

### Interactive Summary Screen
- **Comprehensive learning summary** with Bangla content
- **Progress tracking** - quiz scores, correct/incorrect answers
- **Key learning points** with visual indicators
- **Detailed chapter summaries** with historical context
- **Action buttons** for retry and next chapter navigation
- **Responsive design** with proper typography using Kalpurush font

## ⚙️ CONFIGURATION

### ESLint Configuration
- **CommonJS format** for consistency with other config files
- **No module type warnings** - all config files use the same module system
- **Optimized performance** - no ES module parsing overhead for config files

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

## SPLASH SCREEN CONFIGURATION

ChalkPad uses a centralized configuration system for managing splash screen settings. All splash-related configurations are stored in `splash.config.js` and automatically applied to `app.json`.

### Configuration Files

- **`splash.config.js`**: Main configuration file containing all splash screen settings
- **`utils/splashUtils.js`**: Utility functions for accessing configuration values in components
- **`scripts/update-splash-config.js`**: Script to update `app.json` from configuration file

### Usage

#### Updating Splash Configuration

1. Edit `splash.config.js` with your desired settings
2. Run the update script: `npm run update-splash`
3. The `app.json` will be automatically updated with the new configuration

#### Using Configuration in Components

```javascript
import { getSplashBackgroundColor, getSplashText } from '../utils/splashUtils';

const MyComponent = () => {
  const backgroundColor = getSplashBackgroundColor();
  const text = getSplashText();

  return (
    <View style={{ backgroundColor }}>
      <Text>{text}</Text>
    </View>
  );
};
```

### Configuration Options

- **image**: Path to splash screen image
- **backgroundColor**: Background color for splash screen
- **resizeMode**: Image resize mode (`contain`, `cover`, `stretch`)
- **duration**: Display duration in milliseconds
- **animation**: Fade in/out and scale animation settings
- **text**: Bangla text content for custom splash screens
- **colors**: Color scheme for the app

### Platform-Specific Settings

The configuration supports platform-specific overrides for iOS and Android:

```javascript
export default {
  // Global settings
  backgroundColor: "#ffffff",
  
  // iOS-specific
  ios: {
    backgroundColor: "#f8f9fa"
  },
  
  // Android-specific  
  android: {
    backgroundColor: "#ffffff"
  }
};
```