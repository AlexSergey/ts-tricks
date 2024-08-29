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

const bootstrap = async () => {
    await using file = await getFileHandle("./src/thefile.txt");
    for await (const line of file.filehandle.readLines()) {
      console.log(line);
    }
}

bootstrap();
