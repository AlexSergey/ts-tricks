В TypeScript 5.2 появится новое ключевое слово 'using', которое можно будет использовать для утилизации чего-либо с
помощью функции Symbol.dispose, когда оно покидает область видимости.

```ts
{
  const getResource = () => {
    return {
      [Symbol.dispose]: () => {
        console.log('Hooray!')
      }
    }
  }
  using resource = getResource();
} // 'Hooray!
```

using будет чрезвычайно полезно для управления такими ресурсами, как обработчик файлов, соединения с базами данных и
т.д.

Для работы с ресурсами, которые необходимо утилизировать асинхронно, можно также использовать Symbol.asyncDispose и
await.

Без using:

```ts
import { open } from "node:fs/promises";
let filehandle;
try {
  filehandle = await open("thefile.txt", "r");
} finally {
  await filehandle?.close();
}
```

С использование using:

```ts
import {open} from "node:fs/promises";

const getFileHandle = async (path: string) => {
  const filehandle = await open(path, "r");
  return {
    filehandle,
    [Symbol.asyncDispose]: async () => {
      await filehandle.close();
    },
  };
};
{
    await using file = await getFileHandle("thefile.txt");
  // делаем что-нибудь с file.filehandle
} // автоматически утилизирован!
```
