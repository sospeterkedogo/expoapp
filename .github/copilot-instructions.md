# AI Agent Instructions for ExpoApp

## Project Overview
This is an Expo React Native application using file-based routing and modern React Native patterns. The app follows a tab-based navigation structure with authentication, profile management, and calculator features.

## Architecture & Structure

### Key Directories
- `app/`: Contains all routes using Expo Router's file-based routing system
  - `_layout.js`: Defines tab-based navigation structure
  - `auth/`: Authentication-related screens (login, register)
  - `profile/`: User profile management screens
- `components/`: Reusable React components
- `utils/`: Utility functions and helpers (e.g., AsyncStorage wrapper)

### Navigation Pattern
The app uses Expo Router with a tab-based layout defined in `app/_layout.js`. Routes are automatically generated from the file structure:
```javascript
// Example from _layout.js
<Tabs screenOptions={{headerTitleAlign: "center"}}>
  <Tabs.Screen name="index" options={{title: "Home"}} />
  <Tabs.Screen name="profile" options={{title: "Profile"}} />
  <Tabs.Screen name="calc" options={{title: "Calc"}} />
</Tabs>
```

## Development Workflow

### Setup & Installation
1. Install dependencies: `npm install`
2. Start the development server: `npx expo start`

### Available Scripts
- `npm start`: Start Expo development server
- `npm run android`: Start Android development
- `npm run ios`: Start iOS development
- `npm run web`: Start web development
- `npm run lint`: Run ESLint checks

### Key Dependencies
- Expo SDK 54
- React Native 0.81.4
- Expo Router for file-based routing
- React Navigation for tab-based navigation
- AsyncStorage for local data persistence

## Project-Specific Conventions

### State Management
- Local state with React hooks for component-level state
- AsyncStorage for persistent data storage (see `utils/AsyncStorage.js`)

### Navigation
- File-based routing through Expo Router
- Nested navigation patterns in profile section (`profile/_layout.js`)
- Protected routes in `auth/` directory

### Styling
- Use inline styles with React Native's StyleSheet API
- Consistent center alignment for headers (`headerTitleAlign: "center"`)

## Common Tasks & Examples

### Adding a New Screen
1. Create a new file in the `app/` directory
2. Export a default React component
3. Add to navigation in relevant `_layout.js` if needed

Example:
```javascript
// app/newscreen.js
import { View, Text } from "react-native";

export default function NewScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>New Screen Content</Text>
    </View>
  );
}
```

### Working with Local Storage
Use the AsyncStorage utility for persistent data:
```javascript
import { storeData, getData } from '../utils/AsyncStorage';

// Store data
await storeData('key', value);

// Retrieve data
const data = await getData('key');
```