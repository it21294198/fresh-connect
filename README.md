# Fresh-Connect 
Fresh-Connect is an app that effortlessly connects users with local shops, utilizing real-time location data to showcase nearby options on an interactive map. Users can explore a variety of products offered by nearby sellers, making informed decisions and enhancing their shopping experience.

## Tech Stack
* Reacy Native
* Tailwind CSS
* Typescript
* Firebase

## Contributors

<a href="https://github.com/it21294198/fresh-connect/graphs/contributors">
  <img src="https://contrib.rocks/image?repo=it21294198/fresh-connect" />
</a>

## Getting Started
### 1. Clone the project
```
git clone https://github.com/it21294198/fresh-connect.git
```
### 2. Install packages
```
npm i
```

### 3. Create a file named **.env.local** in root folder
### 4. Include the firebase config
```
  EXPO_PUBLIC_API_KEY = 
  EXPO_PUBLIC_AUTH_DOMAIN = 
  EXPO_PUBLIC_PROJECT_ID = 
  EXPO_PUBLIC_STORAGE_BUCKET = 
  EXPO_PUBLIC_MESSAGING_SENDER_ID = 
  EXPO_PUBLIC_APP_ID = 
```
- - -
### 5. Add env changes to babel.config.js 
 ```js
  module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
       "react-native-reanimated/plugin",
      [
        "module:react-native-dotenv",
        {
          envName: "APP_ENV",
          moduleName: "@env",
          path: ".env.local",
          blocklist: null,
          allowlist: null,
          blacklist: null, // DEPRECATED
          whitelist: null, // DEPRECATED
          safe: false,
          allowUndefined: true,
          verbose: false,
        },
      ],
    ],
  };
};
  ```
### 6. created env.d.ts for enable env with typescript
  ```ts
  declare module '@env' {
  export const EXPO_PUBLIC_API_KEY: string;
  export const EXPO_PUBLIC_AUTH_DOMAIN: string;
  export const EXPO_PUBLIC_PROJECT_ID: string;
  export const EXPO_PUBLIC_STORAGE_BUCKET: string;
  export const EXPO_PUBLIC_MESSAGING_SENDER_ID: string;
  export const EXPO_PUBLIC_APP_ID: string;
}
  ```
### 7. Add tsconfig.json
   ```json
{
  "extends": "expo/tsconfig.base",
  "compilerOptions": {
    "strict": true
  },
  "include": [
    "**/*.ts",
    "**/*.tsx",
    "src/**/*.ts", // Your source files
    "env.d.ts" // Include the env.d.ts file
  ]
}
   ```
