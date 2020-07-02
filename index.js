const { emitter } = require("./emitter");

const main = async () => {
  const wasm = emitter();
  const { instance } = await WebAssembly.instantiate(wasm);
  console.log(instance.exports.run(5, 6));
};

main();
