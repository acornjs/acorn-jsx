import acorn from 'acorn';

export const jsx: (options?: jsx.Options) => (BaseParser: typeof acorn.Parser) => typeof acorn.Parser;

export interface Options {
  allowNamespacedObjects?: boolean;
  allowNamespaces?: boolean;
}

export const tokTypes: {
    jsxName: acorn.TokenType,
    jsxText: acorn.TokenType,
    jsxTagEnd: acorn.TokenType,
    jsxTagStart: acorn.TokenType
} & typeof acorn.tokTypes;

export class AcornJsxParser extends acorn.Parser {
  static readonly acornJsx: {
    tokTypes: typeof tokTypes
  };

  jsx_readString(quote: number): void;
}

export as namespace jsx;
export default jsx;
