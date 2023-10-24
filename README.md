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
  2. created env.d.ts for enable env with typescript
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
  3. add tsconfig.json
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
## Use of Redux correctly

### Get the value inside store (user id = uid)

```ts
import { UserLogin } from '../util/interfaces'; // get the path accordingly
import { useSelector } from 'react-redux';

let uId:string|null = useSelector((state:{user:UserLogin})=>state.user.userId)
let email:string|null = useSelector((state:{user:UserLogin})=>state.user.email)

console.log(email) // you can use this any where
```

### How to use loading
```ts
import { useDispatch } from 'react-redux';
import { loaderSlice } from '../features/connection/loaderSlice';

//palace this near useStates area
const dispatch = useDispatch()

function getLongTimeToProcess(){
  dispatch(setLoadingTrue());
  // put your time consuming process
  dispatch(setLoadingFalse());

  //place navigation if needed below here
}
```

### Set the value inside store (no need to use this)

```ts
import { useDispatch } from 'react-redux';

const dispatch = useDispatch()

const uid:string = '@123abc'

dispatch(setUserId(uid))
```

