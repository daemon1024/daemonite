const { emitter } = require("./emitter");

const main = async () => {
  const wasm = emitter();
  const instance = await WebAssembly.instantiate(wasm);
};
