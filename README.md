## When you clone the project first run following commands and create some file

### Move to folder
```
cd f [press tab key]
```

### Install npm
```
npm i
```

### create file name **.env.local** in root folder
### Include the firebase config
```
  EXPO_PUBLIC_API_KEY = 
  EXPO_PUBLIC_AUTH_DOMAIN = 
  EXPO_PUBLIC_PROJECT_ID = 
  EXPO_PUBLIC_STORAGE_BUCKET = 
  EXPO_PUBLIC_MESSAGING_SENDER_ID = 
  EXPO_PUBLIC_APP_ID = 
```
- - -
When the project is created

  1. add env changes to babel.config.js 
 ```
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
  2. created env.d.ts for enable env with typescript
  ```
  declare module '@env' {
  export const EXPO_PUBLIC_API_KEY: string;
  export const EXPO_PUBLIC_AUTH_DOMAIN: string;
  export const EXPO_PUBLIC_PROJECT_ID: string;
  export const EXPO_PUBLIC_STORAGE_BUCKET: string;
  export const EXPO_PUBLIC_MESSAGING_SENDER_ID: string;
  export const EXPO_PUBLIC_APP_ID: string;
}
  ``` 
  3. add tsconfig.json
   ```
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

