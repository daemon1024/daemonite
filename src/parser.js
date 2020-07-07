exports.parse = (tokens) => {
  const iterator = tokens[Symbol.iterator]();
  let currentToken = iterator.next().value;

  const eatToken = () => (currentToken = iterator.next().value);

  const parseStatement = () => {
    if (currentToken.type === "keyword") {
      switch (currentToken.value) {
        case "print":
          eatToken();
          return {
            type: "printStatement",
            expression: parseExpression(),
          };
      }
    }
  };

  const parseExpression = () => {
    let node;
    switch (currentToken.type) {
      case "number":
        node = {
          type: "numberLiteral",
          value: Number(currentToken.value),
        };
        eatToken();
        return node;
    }
  };

  const nodes = [];
  while (index < tokens.length) {
    nodes.push(parseStatement());
  }

  return nodes;
};
