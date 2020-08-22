"use strict";

if (typeof exports !== "undefined") {
  var assert = require("assert");
  var acorn = require("acorn");
  var jsx = require("..");
  var testAssert = require("./driver.js").testAssert;
}

testAssert("// the enhanced Parser instance should have a static property 'acornJsx'.", function() {
  const JsxParser = acorn.Parser.extend(jsx());
  assert(JsxParser.acornJsx);
});

testAssert("// 'acornJsx' should be the same instance for the same acorn.", function() {
  const JsxParser1 = acorn.Parser.extend(jsx());
  const JsxParser2 = acorn.Parser.extend(jsx());
  assert.strictEqual(JsxParser1.acornJsx, JsxParser2.acornJsx);
});

testAssert("// the static property 'acornJsx' should have two properties.", function() {
  const JsxParser = acorn.Parser.extend(jsx());
  assert(JsxParser.acornJsx.tokTypes, "should have 'tokTypes'.");
  assert(JsxParser.acornJsx.tokContexts, "should have 'tokContexts'.");
});

testAssert("// 'acornJsx.tokTypes' should be used.", function() {
  const JsxParser = acorn.Parser.extend(jsx());
  const code = '<a>{/* foo */}</a>';
  const expectedTokTypes = [
    JsxParser.acornJsx.tokTypes.jsxTagStart,
    JsxParser.acornJsx.tokTypes.jsxName,
    JsxParser.acornJsx.tokTypes.jsxTagEnd,
    acorn.tokTypes.braceL,
    acorn.tokTypes.braceR,
    JsxParser.acornJsx.tokTypes.jsxTagStart,
    acorn.tokTypes.slash,
    JsxParser.acornJsx.tokTypes.jsxName,
    JsxParser.acornJsx.tokTypes.jsxTagEnd,
    acorn.tokTypes.eof
  ]
  const actualTokens = []

  JsxParser.parse(code, {ecmaVersion: 11, onToken: actualTokens})

  assert.strictEqual(actualTokens.length, expectedTokTypes.length);
  for (let i = 0; i < actualTokens.length; ++i) {
    assert.strictEqual(actualTokens[i].type, expectedTokTypes[i]);
  }
});
