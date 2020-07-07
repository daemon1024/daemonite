const keywords = ["print"];

// returns a token if the given regex matches at the current index
const regexMatcher = (regex, type) => (input, index) => {
  const match = input.substring(index).match(regex);
  return (
    match && {
      type,
      value: match[0],
    }
  );
};

const matchers = [
  regexMatcher("^[.0-9]+", "number"),
  regexMatcher(`^(${keywords.join("|")})`, "keyword"),
  regexMatcher("^\\s+", "whitespace"),
];

exports.tokenize = (input) => {
  const tokens = [];
  let index = 0;
  while (index < input.length) {
    const matches = matchers.map((m) => m(input, index)).filter((f) => f);
    const match = matches[0];
    if (match.type !== "whitespace") {
      tokens.push(match);
    }
    index += match.value.length;
  }
  return tokens;
};
