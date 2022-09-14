# TS Custom Types

If you use library without types you can make your own type definitions.

You need to extend your tsconfig file and add "typeRoots". TypeRoots folder should include your custom type folder

```json
{
  "typeRoots": [
    "types",
    "node_modules/@types"
  ]
}
```

Type definitions should store in files:

```text
<lib-name>.d.ts
```

## d.ts

If you use eslint rules you should turn off the rule:

```text
/* eslint-disable @typescript-eslint/no-unused-vars */
```

Types definitions will be on the declare operator:

```typescript
declare module 'math-sum' {
  const mathSum: (...args: number[]) => number;

  export default mathSum;
}
```

If you have external dependencies you can use imports inside declare:

```typescript
declare module 'math-sum' {
  import { CustomType } from 'external-library';
  
  const mathSum: (...args: number[]) => CustomType;

  export default mathSum;
}
```

If you have declare operator inside declare operator you must delete it:

```typescript
declare module 'math-sum' {
  declare const mathSum: (...args: number[]) => CustomType;

  export default mathSum;
}
```

Error!

```typescript
declare module 'math-sum' {
  const mathSum: (...args: number[]) => CustomType;

  export default mathSum;
}
```

Correct!
