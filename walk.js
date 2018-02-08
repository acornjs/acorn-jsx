module.exports = function(walk) {
  const base = walk.base;
  base.JSXSpreadAttribute = base.SpreadElement;
  base.JSXOpeningFragment = base.JSXEmptyExpression = base.JSXIdentifier = base.JSXText = base.JSXClosingFragment = base.Identifier;
  base.JSXAttribute = function(node, st, c) {
    c(node.name, st);
    if (node.value) c(node.value, st);
  };
  base.JSXExpressionContainer = base.JSXSpreadChild = base.ExpressionStatement;
  base.JSXMemberExpression = (node, st, c) => {
    c(node.object, st);
    c(node.property, st);
  }
  base.JSXNamespacedName = (node, st, c) => {
    c(node.namespace, st);
    c(node.name, st);
  }
  base.JSXOpeningElement = function(node, st, c) {
    c(node.name, st);
    for (var i = 0; i < node.attributes.length; ++i) {
      c(node.attributes[i], st);
    }
  };
  base.JSXClosingElement = function(node, st, c) {
    c(node.name, st);
  };
  base.JSXElement = function(node, st, c) {
    c(node.openingElement, st);
    for (var i = 0; i < node.children.length; ++i) {
      c(node.children[i], st);
    }
    if (node.closingElement) c(node.closingElement, st);
  };
  base.JSXFragment = function(node, st, c) {
    c(node.openingFragment, st);
    for (var i = 0; i < node.children.length; ++i) {
      c(node.children[i], st);
    }
    c(node.closingFragment, st);
  };
  return walk;
};
