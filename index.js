let CodeMirror;

const compilerRuntime = require("./src/compiler").runtime;
const { keywords, operators } = require("./src/tokenizer");

const compileButton = document.getElementById("compile");
const codeArea = document.getElementById("code");
const outputArea = document.getElementById("output");

CodeMirror.defineSimpleMode("simplemode", {
  start: [
    {
      regex: new RegExp(`(${keywords.join("|")})`),
      token: "keyword",
    },
    {
      regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i,
      token: "number",
    },
    { regex: /[-+\/*=<>!]+/, token: "operator" },
    { regex: /[a-z$][\w$]*/, token: "variable" },
  ],
});

const editor = CodeMirror.fromTextArea(codeArea, {
  mode: "simplemode",
  theme: "abcdef",
  lineNumbers: true,
});

const sleep = async (ms) =>
  await new Promise((resolve) => setTimeout(resolve, ms));

let marker;

const logMessage = (message) =>
  (outputArea.value = outputArea.value + message + "\n");

const markError = (token) => {
  marker = editor.markText(
    { line: token.line, ch: token.char - 1 },
    { line: token.line, ch: token.char - 1 + token.value.length },
    { className: "error" }
  );
};

const run = async (runtime) => {
  if (marker) {
    marker.clear();
  }

  await sleep(10);

  let tickFunction;

  try {
    tickFunction = await runtime(editor.getValue(), {
      print: logMessage,
    });

    outputArea.value = "";
    logMessage(`Executing ... `);
    tickFunction();
  } catch (error) {
    logMessage(error.message);
    markError(error.token);
  }
};

compileButton.addEventListener("click", async () => {
  compileButton.classList.add("active");
  await run(compilerRuntime);
});
