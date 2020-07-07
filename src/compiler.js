const { emitter } = require("./emitter");
const { tokenize } = require("./tokenizer");
const { parse } = require("./parser");

exports.compile = (src) => {
  const tokens = tokenize(src);
  const ast = parse(tokens);
  const wasm = emitter(ast);
  return wasm;
};

exports.runtime = async (src) => {
  const wasm = compile(src);
  const result = await WebAssembly.instantiate(wasm);
  return () => {
    result.instance.exports.run();
  };
};
